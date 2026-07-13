import { Upload } from "tus-js-client";

export const uploadFile=(file,url,onProgress)=>{
    return new Promise((resolve,reject)=>{
        const upload=new Upload(file,{

            endpoint:url,

            retryDelays:[0,3000,5000],

            chunkSize:6*1024*1024,

            metadata:{
                filename:file.name,
                filetype:file.type
            },

            onError:reject,

            onProgress(bytesUploaded,bytesTotal){
                onProgress(
                    Math.floor(
                        bytesUploaded/bytesTotal*100
                    )
                );
            },

            onSuccess(){
                resolve(upload.url);
            }
        });

        upload.start();

    });
};