const fs = require("fs");
const path = require("path");
const https = require("https");

const prepareAudio = async(url)=>{
    const tempDir = path.join(
        process.cwd(),
        "temp"
    );

    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(
            tempDir,
            {recursive:true}
        );
    }

    const file = path.join(
        tempDir,
        `${Date.now()}.wav`
    );

    await new Promise((resolve,reject)=>{
        const stream =
            fs.createWriteStream(file);

        https.get(url,response=>{
            response.pipe(stream);

            stream.on(
                "finish",
                ()=>{
                    stream.close();
                    resolve();
                }
            );
        }).on(
            "error",
            reject
        );
    });

    return file;

};

module.exports={
    prepareAudio
};