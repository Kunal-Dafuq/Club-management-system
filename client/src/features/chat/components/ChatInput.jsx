import { useRef } from "react";
import { Paperclip, Send, X, File as FileIcon, Video, Smile } from "lucide-react";
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
        const formatted = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            progress: 0,
            status: "waiting",
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        }));

        setAttachments(prev => [...prev, ...formatted]);
        e.target.value = "";
    };

    const removeAttachment = (id) => {
        setAttachments(prev => prev.filter(file => file.id !== id));
    };

    const handleSend = async () => {
        let uploadedFiles = [];

        if (attachments.length) {
            setAttachments(prev => prev.map(file => ({ ...file, status: "uploading" })));

            const response = await uploadChatFiles(
                attachments.map(a => a.file),
                (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setAttachments(prev => prev.map(file => ({
                        ...file,
                        progress,
                        status: progress === 100 ? "uploaded" : "uploading"
                    })));
                }
            );
            uploadedFiles = response.data.files;
        }

        await send({ text, attachments: uploadedFiles });
        setAttachments([]);
    };

    return (
        <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-3 sm:p-4">
            
            {attachments.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                    {attachments.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-28 rounded-xl border border-zinc-700 bg-zinc-800 p-2 shadow-lg shadow-black/20 group"
                        >
                            {item.file.type.startsWith("image/") ? (
                                <>
                                    <img
                                        src={item.preview}
                                        alt=""
                                        className="h-20 w-full rounded-lg object-cover bg-zinc-900"
                                    />
                                    <div className="mt-2 h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                                        <div
                                            className="h-full bg-violet-500 transition-all duration-300"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                    <p className="truncate text-[11px] text-zinc-300 mt-2 font-medium">
                                        {item.file.name}
                                    </p>
                                    <div className="mt-1 flex items-center justify-between text-[10px] font-bold">
                                        <span className="text-zinc-500">{item.progress}%</span>
                                        <span className={
                                            item.status === "uploaded" ? "text-green-500" :
                                            item.status === "uploading" ? "text-violet-400 animate-pulse" :
                                            "text-zinc-500"
                                        }>
                                            {item.status}
                                        </span>
                                    </div>
                                    {item.file.size && (
                                        <p className="text-[10px] text-zinc-600 mt-0.5">
                                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    )}
                                </>
                            ) : item.file.type.startsWith("video/") ? (
                                <div className="flex flex-col items-center gap-2 py-2">
                                    <div className="p-3 bg-zinc-900 rounded-xl text-violet-400">
                                        <Video size={24} />
                                    </div>
                                    <p className="truncate text-xs text-zinc-300 w-full text-center">
                                        {item.file.name}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 py-2">
                                    <div className="p-3 bg-zinc-900 rounded-xl text-blue-400">
                                        <FileIcon size={24} />
                                    </div>
                                    <p className="truncate text-xs text-zinc-300 w-full text-center">
                                        {item.file.name}
                                    </p>
                                </div>
                            )}

                            {item.status !== "uploading" && (
                                <button
                                    onClick={() => removeAttachment(item.id)}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-md hover:bg-red-600 hover:scale-110 transition-all z-10"
                                >
                                    <X size={12} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
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
                    className="rounded-xl p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Attach File"
                >
                    <Paperclip size={20} />
                </button>

                <div className="flex-1 relative flex items-center">
                    <input
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all pr-12"
                        value={text}
                        placeholder="Message the club..."
                        onChange={(e) => {
                            setText(e.target.value);
                            socket.emit("typing", {
                                roomId: clubId,
                                name: user.name
                            });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    
                    <button className="absolute right-2 p-2 text-zinc-500 hover:text-amber-400 transition-colors">
                        <Smile size={18} />
                    </button>
                </div>

                <button
                    onClick={handleSend}
                    disabled={sending || (attachments.length === 0 && !text.trim())}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 sm:px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 hover:bg-violet-500 hover:shadow-violet-900/40 disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                    <span className="hidden sm:inline">
                        {sending ? "Sending..." : "Send"}
                    </span>
                    <Send size={18} className={sending ? "animate-pulse" : ""} />
                </button>
            </div>
        </div>
    );
}