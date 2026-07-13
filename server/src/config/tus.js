const path = require("path");

const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const tusServer = new Server({
    path: "/files",

    datastore: new FileStore({
        directory: path.join(__dirname, "../../uploads")
    })
});

module.exports = tusServer;