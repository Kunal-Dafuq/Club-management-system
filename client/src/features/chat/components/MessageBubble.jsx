import { useState } from "react";
import { MoreVertical, Pin, CheckCheck, Eye, File, Star, Reply, Edit2, Trash2, XCircle } from "lucide-react";
import ReactionBar from "./ReactionBar";
import ReactionList from "./ReactionList";
import MentionText from "./MentionText"; // Assuming this exists in your structure
import { pinMessage, toggleStar } from "../services/chatService";

export default function MessageBubble({
    msg,
    mine,
    handleReaction,
    setReplyingTo,
    deleteForMe,
    deleteForEveryone,
    handleEditMessage,
    refreshMessages
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(msg.content);

    const canEdit = mine && Date.now() - new Date(msg.createdAt).getTime() <= 15 * 60 * 1000;
    const canDeleteForEveryone = mine && Date.now() - new Date(msg.createdAt).getTime() <= 15 * 60 * 1000;

    return (
        <div className={`flex w-full ${mine ? "justify-end" : "justify-start"} group/message relative`}>
            <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 relative shadow-sm ${
                    mine
                        ? "bg-violet-600 text-white rounded-tr-sm"
                        : "bg-zinc-800 text-zinc-100 rounded-tl-sm border border-zinc-700/50"
                }`}
            >
                <div className="flex justify-between items-start gap-4 mb-1">
                    {!mine && (
                        <span className="font-semibold text-sm text-zinc-300">
                            {msg.membership.user.name}
                        </span>
                    )}
                    
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className={`p-1 rounded-md opacity-0 group-hover/message:opacity-100 transition-opacity absolute top-2 ${mine ? "right-2 text-violet-200 hover:bg-violet-700" : "right-2 text-zinc-400 hover:bg-zinc-700"}`}
                    >
                        <MoreVertical size={16} />
                    </button>

                    {showMenu && (
                        <div className="absolute top-8 right-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black w-56 z-50 overflow-hidden text-sm">
                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 transition-colors"
                                onClick={() => { setReplyingTo(msg); setShowMenu(false); }}
                            >
                                <Reply size={14} /> Reply
                            </button>

                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 transition-colors"
                                onClick={async () => {
                                    try {
                                        await pinMessage(msg.id);
                                        refreshMessages?.();
                                        setShowMenu(false);
                                    } catch (err) {
                                        alert(err.response?.data?.message || err.message);
                                    }
                                }}
                            >
                                <Pin size={14} /> Pin Message
                            </button>

                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 transition-colors"
                                onClick={async () => {
                                    try {
                                        await toggleStar(msg.id);
                                        setShowMenu(false);
                                    } catch (err) {
                                        alert(err.response?.data?.message || err.message);
                                    }
                                }}
                            >
                                <Star size={14} /> Star Message
                            </button>

                            {canEdit && (
                                <button
                                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 transition-colors"
                                    onClick={() => { setEditing(true); setEditedText(msg.content); setShowMenu(false); }}
                                >
                                    <Edit2 size={14} /> Edit
                                </button>
                            )}

                            <div className="h-px bg-zinc-800 my-1"></div>

                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors"
                                onClick={() => { deleteForMe(msg.id); setShowMenu(false); }}
                            >
                                <Trash2 size={14} /> Delete for Me
                            </button>

                            {canDeleteForEveryone && (
                                <button
                                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors"
                                    onClick={() => { deleteForEveryone(msg.id); setShowMenu(false); }}
                                >
                                    <XCircle size={14} /> Delete for Everyone
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {msg.replyTo && (
                    <div className={`mb-3 border-l-4 rounded-r-md px-3 py-2 text-sm ${mine ? "border-violet-300 bg-violet-700/50 text-violet-100" : "border-zinc-500 bg-zinc-900/50 text-zinc-400"}`}>
                        <div className={`text-xs font-bold mb-1 ${mine ? "text-violet-200" : "text-zinc-300"}`}>
                            {msg.replyTo.membership.user.name}
                        </div>
                        <div className="truncate opacity-90">
                            {msg.replyTo.content}
                        </div>
                    </div>
                )}

                {msg.deletedForAll ? (
                    <i className={`text-sm italic ${mine ? "text-violet-300" : "text-zinc-500"}`}>
                        This message was deleted
                    </i>
                ) : editing ? (
                    <div className="mt-2">
                        <textarea
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet-500 resize-none"
                            value={editedText}
                            rows={2}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                className="px-3 py-1.5 text-xs font-semibold bg-zinc-700 text-zinc-300 hover:bg-zinc-600 rounded-md transition-colors"
                                onClick={() => { setEditing(false); setEditedText(msg.content); }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1.5 text-xs font-semibold bg-green-600 text-white hover:bg-green-500 rounded-md transition-colors"
                                onClick={async () => { await handleEditMessage(msg.id, editedText); setEditing(false); }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {msg.content && (
                            <div className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
                                <MentionText content={msg.content} />
                            </div>
                        )}

                        {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                            <img
                                src={msg.fileUrl}
                                alt={msg.fileName}
                                className="max-h-80 w-auto rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-black/10"
                            />
                        )}

                        {msg.fileUrl && msg.fileType?.startsWith("video/") && (
                            <video controls className="max-h-80 w-full rounded-xl bg-black border border-black/10">
                                <source src={msg.fileUrl} type={msg.fileType} />
                            </video>
                        )}

                        {msg.fileUrl && !msg.fileType?.startsWith("image/") && !msg.fileType?.startsWith("video/") && (
                            <a
                                href={msg.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${mine ? "bg-violet-700/50 border-violet-500/30 hover:bg-violet-700" : "bg-zinc-900 border-zinc-700 hover:bg-zinc-950"}`}
                            >
                                <div className={`p-2 rounded-lg ${mine ? "bg-violet-500/20" : "bg-zinc-800"}`}>
                                    <File size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{msg.fileName}</p>
                                    <p className={`text-xs mt-0.5 ${mine ? "text-violet-200" : "text-zinc-500"}`}>
                                        {(msg.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </a>
                        )}
                    </div>
                )}

                <div className="flex justify-end items-center gap-1.5 mt-2">
                    <span className={`text-[10px] font-medium ${mine ? "text-violet-200" : "text-zinc-500"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {mine && (
                        msg.readAt ? (
                            <Eye size={12} className="text-blue-300" />
                        ) : msg.deliveredAt ? (
                            <CheckCheck size={12} className="text-violet-300 opacity-80" />
                        ) : null
                    )}
                </div>

                <ReactionBar msg={msg} handleReaction={handleReaction} />
                <ReactionList reactions={msg.reactions} />
            </div>
        </div>
    );
}