const fs = require("fs-extra");

const loadTranscript = async (file) => {

    return fs.readFile(
        file,
        "utf8"
    );

};

module.exports = {
    loadTranscript
};