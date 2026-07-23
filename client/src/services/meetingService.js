import api from "../api/axios";
import uploadAudio from "./uploadAudio";

const BASE_URL = "/meetings";

const buildFormData = (file) => {
    const formData = new FormData();
    formData.append("audio", file);
    return formData;
};

const normalizeError = (error) => {
    if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    if (error?.message) {
        throw new Error(error.message);
    }
    throw new Error("Unexpected server error.");
};

const request = async (callback) => {
    try {
        const response = await callback();
        return response.data;
    } catch (error) {
        normalizeError(error);
    }
};

export const uploadMeetingAudio = async (file) => {
    return request(() =>
        api.post(`${BASE_URL}/upload`, buildFormData(file), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    );
};

export const transcribeMeeting = async (audioUrl) => {
    return request(() =>
        api.post(`${BASE_URL}/transcribe`, {
            audioUrl
        })
    );
};

export const summarizeMeeting = async (transcript) => {
    return request(() =>
        api.post(`${BASE_URL}/summarize`, {
            transcript
        })
    );
};

export const createMeeting = async ({
    title,
    committeeId,
    transcript,
    summary,
    audioUrl,
    duration
}) => {
    return request(() =>
        api.post(BASE_URL, {
            title,
            committeeId,
            transcript,
            summary,
            audioUrl,
            duration
        })
    );
};

export const getMeetings = async ({
    committeeId,
    page = 1,
    limit = 10
}) => {
    return request(() =>
        api.get(BASE_URL, {
            params: {
                committeeId,
                page,
                limit
            }
        })
    );
};

export const getMeeting = async (meetingId) => {
    return request(() =>
        api.get(`${BASE_URL}/${meetingId}`)
    );
};

export const updateMeeting = async (meetingId, payload) => {
    return request(() =>
        api.patch(`${BASE_URL}/${meetingId}`, payload)
    );
};

export const deleteMeeting = async (meetingId) => {
    return request(() =>
        api.delete(`${BASE_URL}/${meetingId}`)
    );
};

export const regenerateMeetingSummary = async (meetingId) => {
    return request(() =>
        api.post(`${BASE_URL}/${meetingId}/summary`)
    );
};

export const searchMeetings = async ({
    committeeId,
    query
}) => {
    return request(() =>
        api.get(`${BASE_URL}/search`, {
            params: {
                committeeId,
                query
            }
        })
    );
};

export const getMeetingStatistics = async (committeeId) => {
    return request(() =>
        api.get(`${BASE_URL}/statistics`, {
            params: {
                committeeId
            }
        })
    );
};

const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
};

const getExtension = (contentType) => {
    switch (contentType) {
        case "application/pdf":
            return "pdf";
        case "text/plain":
            return "txt";
        case "application/json":
            return "json";
        case "audio/mpeg":
            return "mp3";
        case "audio/mp4":
            return "m4a";
        case "audio/wav":
            return "wav";
        default:
            return "bin";
    }
};

const buildDownloadName = (prefix, meetingId, extension) => {
    return `${prefix}-${meetingId}.${extension}`;
};

const downloadFile = async (endpoint, defaultPrefix) => {
    try {
        const response = await api.get(endpoint, {
            responseType: "blob"
        });

        const extension = getExtension(response.headers["content-type"]);
        const meetingId = endpoint
            .split("/")
            .findLast(item => !Number.isNaN(Number(item)));

        downloadBlob(
            response.data,
            buildDownloadName(defaultPrefix, meetingId, extension)
        );

        return true;
    } catch (error) {
        normalizeError(error);
    }
};

export const downloadTranscript = async (meetingId) => {
    return downloadFile(`${BASE_URL}/${meetingId}/transcript`, "transcript");
};

export const downloadSummary = async (meetingId) => {
    return downloadFile(`${BASE_URL}/${meetingId}/summary`, "summary");
};

export const downloadAudio = async (meetingId) => {
    return downloadFile(`${BASE_URL}/${meetingId}/audio`, "recording");
};

export const openAudioInNewTab = async (meetingId) => {
    try {
        const { audioUrl } = await request(() =>
            api.get(`${BASE_URL}/${meetingId}/audio-url`)
        );
        window.open(audioUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
        normalizeError(error);
    }
};

export const exportMeetingAsJson = async (meetingId) => {
    try {
        const meeting = await getMeeting(meetingId);
        const blob = new Blob(
            [JSON.stringify(meeting, null, 2)],
            { type: "application/json" }
        );
        downloadBlob(blob, buildDownloadName("meeting", meetingId, "json"));
        return true;
    } catch (error) {
        normalizeError(error);
    }
};

export const duplicateMeeting = async (meetingId) => {
    try {
        const meeting = await getMeeting(meetingId);
        return createMeeting({
            title: `${meeting.title} (Copy)`,
            committeeId: meeting.committeeId,
            transcript: meeting.transcript,
            summary: meeting.summary,
            audioUrl: meeting.audioUrl,
            duration: meeting.duration
        });
    } catch (error) {
        normalizeError(error);
    }
};

export const renameMeeting = async (meetingId, title) => {
    return updateMeeting(meetingId, { title });
};

export const archiveMeeting = async (meetingId) => {
    return request(() =>
        api.patch(`${BASE_URL}/${meetingId}/archive`)
    );
};

export const restoreMeeting = async (meetingId) => {
    return request(() =>
        api.patch(`${BASE_URL}/${meetingId}/restore`)
    );
};

export const uploadAndProcessMeeting = async ({
    file,
    committeeId,
    title,
    onUploadProgress
}) => {
    if (!file) {
        throw new Error("Meeting recording is required.");
    }

    if (!uploadAudio) {
        throw new Error("uploadAudio() utility is required.");
    }

    const upload = await uploadAudio({
        file,
        bucket: "meeting-audio",
        folder: "meetings",
        onProgress: onUploadProgress
    });

    const fileUrl = upload.secureUrl || upload.publicUrl;

    const transcript = await transcribeMeeting(fileUrl);

    const summary = await summarizeMeeting(transcript.transcript);

    const meeting = await createMeeting({
        title,
        committeeId,
        transcript: transcript.transcript,
        summary,
        audioUrl: fileUrl,
        duration: transcript.duration
    });

    return {
        upload,
        transcript,
        summary,
        meeting
    };
};

export const retryMeetingProcessing = async (options) => {
    let attempts = 0;
    let lastError;

    while (attempts < 3) {
        try {
            return await uploadAndProcessMeeting(options);
        } catch (error) {
            attempts++;
            lastError = error;

            if (attempts >= 3) {
                break;
            }

            await new Promise(resolve =>
                setTimeout(resolve, attempts * 1500)
            );
        }
    }

    throw lastError;
};

export const processExistingRecording = async ({
    title,
    committeeId,
    audioUrl
}) => {
    const transcript = await transcribeMeeting(audioUrl);
    const summary = await summarizeMeeting(transcript.transcript);

    return createMeeting({
        title,
        committeeId,
        transcript: transcript.transcript,
        summary,
        audioUrl,
        duration: transcript.duration
    });
};

export const generateSummaryOnly = async (transcript) => {
    return summarizeMeeting(transcript);
};

export const regenerateTranscript = async (audioUrl) => {
    return transcribeMeeting(audioUrl);
};

export const processMeetingFromDatabase = async (meetingId) => {
    const meeting = await getMeeting(meetingId);
    const transcript = await transcribeMeeting(meeting.audioUrl);
    const summary = await summarizeMeeting(transcript.transcript);

    return updateMeeting(meetingId, {
        transcript: transcript.transcript,
        summary
    });
};

export const validateMeetingFile = (file) => {
    if (!file) {
        throw new Error("No file selected.");
    }

    const allowed = [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/webm",
        "audio/mp4",
        "audio/x-m4a",
        "audio/aac",
        "audio/ogg"
    ];

    if (!allowed.includes(file.type)) {
        throw new Error("Unsupported audio format.");
    }

    if (file.size > 250 * 1024 * 1024) {
        throw new Error("Maximum file size is 250 MB.");
    }

    return true;
};

export const estimateProcessingTime = (fileSize) => {
    const mb = fileSize / (1024 * 1024);

    if (mb <= 10) return "10-20 seconds";
    if (mb <= 50) return "20-45 seconds";
    if (mb <= 100) return "1-2 minutes";
    return "2-5 minutes";
};

export const meetingPipelineStages = [
    "uploading",
    "transcribing",
    "summarizing",
    "saving",
    "completed"
];

export default {
    uploadMeetingAudio,
    transcribeMeeting,
    summarizeMeeting,
    createMeeting,
    getMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    regenerateMeetingSummary,
    searchMeetings,
    getMeetingStatistics,
    downloadTranscript,
    downloadSummary,
    downloadAudio,
    openAudioInNewTab,
    exportMeetingAsJson,
    duplicateMeeting,
    renameMeeting,
    archiveMeeting,
    restoreMeeting,
    uploadAndProcessMeeting,
    retryMeetingProcessing,
    processExistingRecording,
    processMeetingFromDatabase,
    generateSummaryOnly,
    regenerateTranscript,
    validateMeetingFile,
    estimateProcessingTime,
    meetingPipelineStages
};