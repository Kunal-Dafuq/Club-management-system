const { execFile } = require("child_process");
const util = require("util");
const path = require("path");

const exec = util.promisify(execFile);

const transcribe = async (audioPath) => {
    const outputDir = path.join(
        process.cwd(),
        "uploads",
        "transcripts"
    );

    await exec(
        "whisper",
        [
            audioPath,
            "--model",
            process.env.WHISPER_MODEL || "base",
            "--output_dir",
            outputDir
        ]
    );

    const txt = path.join(
        outputDir,
        path.parse(audioPath).name + ".txt"
    );

    return txt;

};

module.exports = {
    transcribe
};