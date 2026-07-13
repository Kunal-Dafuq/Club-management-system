const path = require("path");

const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const uploadCompletedFile=require("./uploadComplete");

const tusServer = new Server({
    path: "/files",

    datastore: new FileStore({
        directory: path.join(
            process.cwd(),
            "uploads"
        )
    })
});

tusServer.on("POST_FINISH", async (req, res, upload) => {
    try {
        await uploadCompletedFile({
            id: upload.id,
            filename: upload.metadata?.filename,
            filetype: upload.metadata?.filetype,
            filesize: upload.size,
            taskId: upload.metadata?.taskId,
        });
    } catch (error) {
        console.error("TUS upload completion failed:", error);
    }
});

module.exports = tusServer;