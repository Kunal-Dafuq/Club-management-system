const fs = require("fs");
const https = require("https");

const download = (url, destination) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination);

        https.get(url, response => {
            response.pipe(file);

            file.on("finish", () => {
                file.close(resolve);
            });
        }).on("error", err => {
            fs.unlink(destination, () => {});
            reject(err);
        });
    });
};

module.exports = download;