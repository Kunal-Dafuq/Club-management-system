const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { whisper } = require("@lumen-labs-dev/whisper-node");

const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const prisma = require("../config/prisma");
const { createAuditLog } = require("./auditService");
const { createActivity } = require("./activityService");
const auditLogger = require("../utils/auditLogger");
const ApiError = require("../utils/ApiError");
const { createMeetEvent, updateCalendarEvent, deleteCalendarEvent } = require("./googleCalendarService");

const createMeeting = async (committeeId, userId, data) => {
    const committee = await prisma.committee.findUnique({
        where: { id: committeeId }
    });

    if (!committee) {
        throw new ApiError(404, "Committee not found.");
    }

    const organizer = await prisma.membership.findUnique({
        where: { 
            userId_clubId: {
                userId: userId,
                clubId: committee.clubId
            }
        },
        include: { user: true }
    });

    if (!organizer) {
        throw new ApiError(404, "Organizer membership not found in this club.");
    }

    let startTime = new Date(data.startTime);
    let endTime = new Date(data.endTime);

    if (data.isInstant) {
        startTime = new Date();
        endTime = new Date(Date.now() + 60 * 60 * 1000);
    }

    let meetingLink = null;
    let calendarEventId = null;

    if (data.meetingProvider === "GOOGLE_MEET" && organizer.user.googleAccessToken) {
        const event = await createMeetEvent({
            accessToken: organizer.user.googleAccessToken,
            title: data.title,
            description: data.description,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            attendees: []
        });

        meetingLink = event.hangoutLink;
        calendarEventId = event.id;
    }

    return await prisma.$transaction(async (tx) => {
        const meeting = await tx.committeeMeeting.create({
            data: {
                title: data.title,
                description: data.description,
                agenda: data.agenda,
                startTime,
                endTime,
                meetingProvider: data.meetingProvider,
                isInstant: data.isInstant || false,
                onlineLink: meetingLink,
                calendarEventId,
                committeeId,
                organizerId: organizer.id
            },
            include: {
                committee: true,
                organizer: {
                    include: { user: true }
                }
            }
        });
        return meeting;
    });
};

const getCommitteeMeetings = async (committeeId) => {
    return prisma.committeeMeeting.findMany({
        where: { committeeId },
        include: {
            organizer: {
                include: { user: true }
            }
        },
        orderBy: { startTime: "asc" }
    });
};

const getMeeting = async (meetingId) => {
    return prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: {
            organizer: {
                include: { user: true }
            },
            attendees: {
                include: {
                    membership: {
                        include: { user: true }
                    }
                }
            }
        }
    });
};

const updateMeeting = async (meetingId, data) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: {
            organizer: {
                include: { user: true }
            }
        }
    });

    if (!meeting) {
        throw new ApiError(404, "Meeting not found");
    }

    if (meeting.calendarEventId && meeting.meetingProvider === "GOOGLE_MEET") {
        await updateCalendarEvent({
            accessToken: meeting.organizer.user.googleAccessToken,
            eventId: meeting.calendarEventId,
            title: data.title,
            description: data.description,
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString(),
            attendees: []
        });
    }

    return prisma.committeeMeeting.update({
        where: { id: meetingId },
        data: {
            title: data.title,
            agenda: data.agenda,
            location: data.location,
            onlineLink: data.meetingLink,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime)
        }
    });
};

const deleteMeeting = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: {
            organizer: {
                include: { user: true }
            }
        }
    });

    if (!meeting) {
        throw new ApiError(404, "Meeting not found.");
    }

    if (meeting.calendarEventId && meeting.meetingProvider === "GOOGLE_MEET") {
        await deleteCalendarEvent({
            eventId: meeting.calendarEventId,
            auth: meeting.organizer.user.googleAccessToken
        });
    }

    const deleted = await prisma.committeeMeeting.update({
        where: { id: meetingId },
        data: { deletedAt: new Date() }
    });

    await createAuditLog({
        action: "MEETING_DELETED",
        entityType: "Meeting",
        entityId: deleted.id,
        committeeId: deleted.committeeId
    });

    return deleted;
};

const restoreMeeting = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.update({
        where: { id: meetingId },
        data: { deletedAt: null }
    });

    await auditLogger({
        action: "MEETING_RESTORED",
        entityType: "Meeting",
        entityId: meeting.id,
        committeeId: meeting.committeeId
    });

    return meeting;
};

const markAttendance = async (meetingId, membershipId, status) => {
    const attendance = await prisma.meetingAttendance.upsert({
        where: {
            meetingId_membershipId: { meetingId, membershipId }
        },
        create: { meetingId, membershipId, status },
        update: { status }
    });

    const meeting = await prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: { committee: true }
    });

    if (meeting) {
        await createActivity({
            clubId: meeting.committee.clubId,
            userId: membershipId,
            action: "MEETING_ATTENDANCE",
            description: `Attendance marked as ${status}.`
        });
    }

    return attendance;
};

const getMeetingStatistics = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: {
            attendees: true,
            committee: {
                include: { members: true }
            }
        }
    });

    if (!meeting) {
        throw new ApiError(404, "Meeting not found.");
    }

    const present = meeting.attendees.filter(a => a.status === "PRESENT").length;
    const absent = meeting.attendees.filter(a => a.status === "ABSENT").length;
    const late = meeting.attendees.filter(a => a.status === "LATE").length;
    const excused = meeting.attendees.filter(a => a.status === "EXCUSED").length;
    
    const totalMembers = meeting.committee.members.length;
    const pending = totalMembers - meeting.attendees.length;

    return {
        present,
        absent,
        late,
        excused,
        pending,
        totalMembers,
        attendancePercentage: totalMembers === 0 ? 0 : Math.round(((present + late) / totalMembers) * 100)
    };
};

const transcribeAudioWithWhisper = async (audioUrl) => {
    let tempRawPath = null;
    let tempWavPath = null;

    try {
        if (!audioUrl) {
            throw new ApiError(400, "Audio URL is required for local transcription.");
        }

        const fileExtension = path.extname(new URL(audioUrl).pathname) || ".mp3";
        tempRawPath = path.join(os.tmpdir(), `meeting_raw_${Date.now()}${fileExtension}`);
        tempWavPath = path.join(os.tmpdir(), `meeting_converted_${Date.now()}.wav`);

        const writer = fs.createWriteStream(tempRawPath);
        const response = await axios({
            url: audioUrl,
            method: "GET",
            responseType: "stream"
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        await execPromise(`ffmpeg -i "${tempRawPath}" -ar 16000 -ac 1 -c:a pcm_s16le "${tempWavPath}" -y`);

        const options = {
            modelName: "small",
            whisperOptions: {
                language: "en",
                gen_file_txt: false,
                gen_file_subtitle: false,
                gen_file_vtt: false
            }
        };

        const transcriptResult = await whisper(tempWavPath, options);

        if (!transcriptResult || transcriptResult.length === 0) {
            throw new ApiError(500, "Whisper returned an empty transcript.");
        }

        const transcriptText = transcriptResult.map(segment => segment.speech.trim()).join(" ");
        const lastSegment = transcriptResult[transcriptResult.length - 1];
        const durationInSeconds = lastSegment && lastSegment.end ? Math.round(Number(lastSegment.end)) : 0;

        return {
            transcript: transcriptText,
            duration: durationInSeconds
        };
    } catch (error) {
        console.error("Whisper Error:", error.message);
        throw new ApiError(500, "Failed to transcribe audio locally: " + error.message);
    } finally {
        if (tempRawPath && fs.existsSync(tempRawPath)) fs.unlinkSync(tempRawPath);
        if (tempWavPath && fs.existsSync(tempWavPath)) fs.unlinkSync(tempWavPath);
    }
};

const summarizeTranscriptWithOllama = async (transcript) => {
    try {
        const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
        const ollamaModel = process.env.OLLAMA_MODEL || "qwen2.5:3b";

        const prompt = `You are an AI meeting assistant. Summarize the following meeting transcript. You MUST output your response STRICTLY as a JSON object. Do not include any intro, outro, or markdown formatting outside the JSON block.
        
        Use this exact JSON structure:
        {
            "summary": "A brief 2-3 sentence overview of the meeting",
            "discussionPoints": ["Point 1", "Point 2"],
            "decisions": ["Decision 1"],
            "actionItems": ["Action 1"],
            "nextSteps": ["Next step 1"]
        }

        Transcript:
        ${transcript}`;

        const response = await axios.post(`${ollamaUrl}/api/generate`, {
            model: ollamaModel,
            prompt: prompt,
            format: "json",
            stream: false
        });

        const result = JSON.parse(response.data.response);
        return result;
        
    } catch (error) {
        console.error("Ollama Error:", error?.message);
        throw new ApiError(500, "Failed to generate meeting summary.");
    }
};

module.exports = {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    restoreMeeting,
    markAttendance,
    getMeetingStatistics,
    transcribeAudioWithWhisper,
    summarizeTranscriptWithOllama
};