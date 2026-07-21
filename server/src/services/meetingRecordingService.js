const prisma = require("../config/prisma");

const meetingPipeline = require("../ai/meetingPipeline");

const saveRecording = async ({
    meetingId,
    membershipId,
    recordingUrl,
    bucket,
    storagePath,
    mimeType,
    size,
    checksum,
    duration
})=>{
    const recording =
        await prisma.meetingRecording.create({
            data:{
                meetingId,
                uploadedById:membershipId,
                recordingUrl,
                bucket,
                storagePath,
                mimeType,
                size,
                checksum,
                duration
            }
        });

    meetingPipeline(
        meetingId
    ).catch(console.error);

    return recording;
};

const getRecordings = async(meetingId)=>{
    return prisma.meetingRecording.findMany({
        where:{
            meetingId
        },

        include:{
            uploader:{
                include:{
                    user:true
                }
            }
        },

        orderBy:{
            createdAt:"desc"
        }
    });
};

module.exports={
    saveRecording,
    getRecordings
};