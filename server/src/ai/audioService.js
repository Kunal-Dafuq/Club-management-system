const path = require("path");

const download = require("./downloadService");

const prepareAudio = async (url) => {

    const localPath =
        path.join(
            process.cwd(),
            "temp",
            `${Date.now()}.wav`
        );

    await download(
        url,
        localPath
    );

    return localPath;

};

module.exports = {
    prepareAudio
};