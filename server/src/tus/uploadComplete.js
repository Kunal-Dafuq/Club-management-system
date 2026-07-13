const fs = require("fs");

const path = require("path");

const supabase = require("../config/supabase");

const prisma = require("../config/prisma");

async function uploadCompletedFile(metadata){
    const taskId=Number(metadata.taskId);

    const filename=metadata.filename;

    const uploadId=metadata.id;

    const filePath=path.join(
        process.cwd(),
        "uploads",
        uploadId
    );

    const stream=fs.createReadStream(filePath);

    const storagePath=`tasks/${taskId}/${Date.now()}-${filename}`;

    const {error}=await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(
            storagePath,
            stream,
            {
                duplex:"half",
                upsert:false
            }
        );

    if(error){
        throw error;
    }

    const {data}=supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(storagePath);

    await prisma.taskAttachment.create({
        data:{
            taskId,
            fileName:filename,
            fileUrl:data.publicUrl,
            mimeType:metadata.filetype,
            size:Number(metadata.filesize)
        }
    });

    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
    }
}

module.exports=uploadCompletedFile;