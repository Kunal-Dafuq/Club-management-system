import * as tus from "tus-js-client";

export function uploadTaskAttachment(
    taskId,
    file,
    onProgress
){
    return new Promise((resolve,reject)=>{
        const upload=new tus.Upload(file,{

            endpoint: "http://localhost:5000/files",

            metadata:{
                filename:file.name,
                filetype:file.type,
                filesize:file.size,
                taskId
            },

            retryDelays:[
                0,
                3000,
                5000,
                10000
            ],

            chunkSize:
                5*1024*1024,

            onError:reject,

            onProgress(bytes,total){
                onProgress?.(
                    Math.floor(
                        bytes/total*100
                    )
                );
            },
            
            onSuccess(){
                resolve(upload.url);
            }
        });

        upload.findPreviousUploads().then(previous=>{
            if(previous.length){
                upload.resumeFromPreviousUpload(
                    previous[0]
                );
            }

            upload.start();

        });
    });
}