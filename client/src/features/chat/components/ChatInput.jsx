import { useRef } from "react";
import {Paperclip,Send,X,File,Video} from "lucide-react";
import { uploadChatFiles } from "../../../api/uploadApi";

export default function ChatInput({
    text,
    setText,

    attachments,
    setAttachments,

    send,
    sending,

    socket,
    clubId,
    user
}) {

    const fileInputRef = useRef(null);

    const chooseFiles = () => {
        fileInputRef.current.click();
    };

    const handleFiles = (e) => {

        const files = [...e.target.files];

        const formatted = files.map(file=>({
            id:crypto.randomUUID(),
            file,
            progress:0,
            status:"waiting",
            preview:file.type.startsWith("image/")
                ?URL.createObjectURL(file)
                :null
        }));

        setAttachments(prev => [
            ...prev,
            ...formatted
        ]);

        e.target.value = "";

    };

    const removeAttachment = (id) => {
        setAttachments(prev =>
            prev.filter(file => file.id !== id)
        );
    };

    const handleSend = async () => {
        let uploadedFiles = [];

        if (attachments.length) {
            setAttachments(prev =>
                prev.map(file => ({
                    ...file,
                    status: "uploading"
                }))
            );

            const response = await uploadChatFiles(
                attachments.map(a => a.file),

                (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) /
                        progressEvent.total
                    );

                    setAttachments(prev =>
                        prev.map(file => ({
                            ...file,
                            progress,
                            status:
                                progress === 100
                                    ? "uploaded"
                                    : "uploading"
                        }))
                    );
                }
            );

            uploadedFiles = response.data.files;
        }

        await send({
            text,
            attachments: uploadedFiles
        });

        setAttachments([]);
    };

    return (
        <div className="border-t bg-white p-3">
            {
                attachments.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-3">
                        {
                            attachments.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="
                                        relative
                                        w-28
                                        rounded-xl
                                        border
                                        bg-gray-50
                                        p-2
                                    "
                                >

                                    {
                                        item.file.type.startsWith("image/") ?
                                            <>
                                                <img
                                                    src={item.preview}
                                                    alt=""
                                                    className="
                                                        h-20
                                                        w-full
                                                        rounded
                                                        object-cover
                                                    "
                                                />

                                                <div className="mt-2 h-2 rounded bg-gray-200">
                                                    <div
                                                        className="h-2 rounded bg-blue-600 transition-all"
                                                        style={{
                                                            width:`${item.progress}%`
                                                        }}
                                                    />
                                                </div>

                                                <p
                                                    className="
                                                    truncate
                                                    text-xs
                                                    mt-2
                                                    "
                                                >
                                                    {item.file.name}
                                                </p>

                                                <div className="mt-2 flex items-center justify-between text-xs">

                                                    <span>
                                                        {item.progress}%
                                                    </span>

                                                    <span
                                                        className={
                                                            item.status==="uploaded"
                                                            ? "text-green-600"
                                                            : item.status==="uploading"
                                                            ? "text-blue-600"
                                                            : "text-gray-500"
                                                        }
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>

                                                {
                                                item.file.size && (
                                                    <p className="text-[10px] text-gray-500">

                                                        {(item.file.size/1024/1024).toFixed(2)} MB

                                                    </p>
                                                )
                                                }
                                            </>
                                            :

                                            item.file.type.startsWith("video/")
                                                ?
                                                <div className="flex flex-col items-center gap-2">
                                                    <Video size={32} />
                                                    <p className="truncate text-xs">
                                                        {item.file.name}
                                                    </p>
                                                </div>

                                                :

                                                <div className="flex flex-col items-center gap-2">
                                                    <File size={32} />
                                                    <p className="truncate text-xs">

                                                        {item.file.name}

                                                    </p>
                                                </div>
                                    }

                                    {
                                    item.status !== "uploading" && (

                                    <button
                                        onClick={() => removeAttachment(item.id)}
                                        className="
                                            absolute
                                            -right-2
                                            -top-2
                                            rounded-full
                                            bg-red-500
                                            p-1
                                            text-white
                                        "
                                    >
                                        <X size={12}/>
                                     </button> 
                                    )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <div className="flex items-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    multiple
                    onChange={handleFiles}
                />

                <button
                    type="button"
                    onClick={chooseFiles}
                    className="
                        rounded-lg
                        p-2
                        hover:bg-gray-100
                    "
                >

                    <Paperclip size={20} />
                </button>

                <input
                    className="
                        flex-1
                        rounded-lg
                        border
                        px-4
                        py-2
                    "
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
                            handleSend();
                        }
                    }}
                />

                <button
                    onClick={handleSend}
                    disabled={
                        sending ||
                        (
                            attachments.length === 0 &&
                            !text.trim()
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                        disabled:opacity-50
                    "
                >

                    <Send size={18} />

                    {
                        sending
                            ? "Sending..."
                            : "Send"
                    }

                </button>
            </div>
        </div>
    );
}