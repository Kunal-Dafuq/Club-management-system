import { useState } from "react";
import { uploadChatFile } from "../../../services/chatService";

export default function ChatInput({
    text,
    setText,
    send,
    sending,
    socket,
    clubId,
    user
}) {
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        if (!file) return;
        setUploading(true);

        try {
            const res = await uploadChatFile(file);
            socket.emit("send-message", {
                roomId: clubId,
                fileUrl: res.data.url,
                fileName: res.data.name,
                fileType: res.data.type,
                fileSize: res.data.size
            });
        }

        catch (err) {
            console.error(err);
        }

        finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <label
                className="
                    cursor-pointer
                    border
                    rounded-lg
                    px-3
                    py-2
                    hover:bg-gray-100
                "
            >
                📎
                <input
                    hidden
                    type="file"
                    onChange={handleFile}
                />
            </label>

            <input
                className="flex-1 border rounded-lg px-4 py-2"
                value={text}
                placeholder="Type a message..."
                onChange={(e) => {
                    setText(e.target.value);
                    socket.emit("typing", {
                        roomId: clubId,
                        name: user.name
                    });
                }}

                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        send();
                    }
                }}
            />

            <button
                className="px-4 py-2 rounded bg-blue-600 text-white"

                disabled={
                    sending ||
                    uploading ||
                    !text.trim()
                }

                onClick={send}
            >
                {
                    sending
                        ? "Sending..."
                        : uploading
                            ? "Uploading..."
                            : "Send"
                }
            </button>
        </div>
    );
}