import { useState } from "react";
import {MoreVertical,Pin} from "lucide-react";
import {CheckCheck,Eye,File} from "lucide-react";
import ReactionBar from "./ReactionBar";
import ReactionList from "./ReactionList";
import { pinMessage } from "../../../services/chatService";
import { Star } from "lucide-react";
import { toggleStar } from "../../../services/chatService";

export default function MessageBubble({
    msg,
    mine,
    handleReaction,
    setReplyingTo,
    deleteForMe,
    deleteForEveryone,
    handleEditMessage,
    refreshMessages
}){

    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(msg.content);

    const canEdit =
        mine &&
        Date.now() - new Date(msg.createdAt).getTime() <=
        15 * 60 * 1000;

    const canDeleteForEveryone =
    mine &&
    Date.now() - new Date(msg.createdAt).getTime() <= 15 * 60 * 1000;
    return (
        <div
            className={`max-w-[70%] rounded-lg p-3 relative ${
                mine
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
            }`}
        >

            <div className="flex justify-between items-start">

                <div className="font-semibold text-sm">
                    {msg.membership.user.name}
                </div>

                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 rounded hover:bg-black/10"
                >
                    <MoreVertical size={18} />
                </button>

                {showMenu && (
                    <div
                        className="
                            absolute
                            top-8
                            right-2
                            bg-white
                            text-black
                            rounded-lg
                            shadow-xl
                            border
                            w-52
                            z-50
                        "
                    >

                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                setReplyingTo(msg);
                                setShowMenu(false);
                            }}
                        >
                            ↩ Reply
                        </button>

                        <button
                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
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
                            <Pin size={16} />
                            Pin Message
                        </button>

                        <button
                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={async () => {
                                try {
                                    await toggleStar(msg.id);
                                    setShowMenu(false);
                                } catch (err) {

                                    alert(
                                        err.response?.data?.message ||
                                        err.message
                                    );
                                }
                            }}
                        >
                            <Star size={16} />
                            Star Message
                        </button>

                        {canEdit && (
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setEditing(true);
                                    setEditedText(msg.content);
                                    setShowMenu(false);
                                }}
                            >
                                ✏ Edit
                            </button>
                        )}

                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                deleteForMe(msg.id);
                                setShowMenu(false);
                            }}
                        >
                            🗑 Delete for Me
                        </button>

                        {canDeleteForEveryone && (
                            <button
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                    deleteForEveryone(msg.id);
                                    setShowMenu(false);
                                }}
                            >
                                ❌ Delete for Everyone
                            </button>
                        )}
                    </div>
                )}
            </div>

            {msg.replyTo && (
                <div className="mb-2 border-l-4 border-blue-400 bg-gray-100 rounded px-3 py-2">
                    <div className="text-xs font-semibold text-blue-700">
                        
                        {msg.replyTo.membership.user.name}

                    </div>

                    <div className="text-sm truncate">
                        
                        {msg.replyTo.content}
                    
                    </div>
                </div>
            )}

            {msg.deletedForAll ? (
                <i className="text-gray-500">
                    This message was deleted
                </i>
            ) : editing ? (
                <div>
                    <input
                        className="border rounded px-2 py-1 w-full text-black"
                        value={editedText}
                        onChange={(e) =>
                            setEditedText(e.target.value)
                        }
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            className="px-2 py-1 bg-green-600 text-white rounded"
                            onClick={async () => {
                                await handleEditMessage(
                                    msg.id,
                                    editedText
                                );
                                setEditing(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="px-2 py-1 bg-gray-500 text-white rounded"
                            onClick={() => {
                                setEditing(false);
                                setEditedText(msg.content);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            ) : (

                <div>
                    <div className="space-y-2">

                        {
                            msg.content && (
                                <div className="wrap-break-word">
                                    <MentionText content={msg.content}/>
                                </div>
                            )
                        }

                        {
                            msg.fileUrl &&
                            msg.fileType?.startsWith("image/") && (

                                <img
                                    src={msg.fileUrl}
                                    alt={msg.fileName}
                                    className="
                                        max-h-80
                                        rounded-xl
                                        cursor-pointer
                                        hover:opacity-95
                                        transition
                                    "
                                />

                            )
                        }

                        {
                            msg.fileUrl &&
                            msg.fileType?.startsWith("video/") && (

                                <video
                                    controls
                                    className="
                                        max-h-96
                                        rounded-xl
                                    "
                                >
                                    <source
                                        src={msg.fileUrl}
                                        type={msg.fileType}
                                    />
                                </video>

                            )
                        }

                        {
                            msg.fileUrl &&
                            !msg.fileType?.startsWith("image/") &&
                            !msg.fileType?.startsWith("video/") && (

                                <a
                                    href={msg.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-lg
                                        border
                                        bg-gray-100
                                        p-3
                                        hover:bg-gray-200
                                    "
                                >
                                    <File size={22}/>

                                    <div>

                                        <p className="font-medium">

                                            {msg.fileName}

                                        </p>

                                        <p className="text-xs text-gray-500">

                                            {(msg.fileSize/1024/1024).toFixed(2)} MB

                                        </p>
                                    </div>
                                </a>
                            )
                        }
                    </div>

                    <div className="flex justify-end items-center gap-1 mt-2">
                        <span
                            className={`text-xs ${
                                mine
                                    ? "text-blue-100"
                                    : "text-gray-500"
                            }`}
                        >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>

                        {
                            mine && (

                                msg.readAt
                                    ? (
                                        <Eye
                                            size={14}
                                            className="text-green-500"
                                        />
                                    )
                                    : msg.deliveredAt
                                        ? (
                                            <CheckCheck
                                                size={14}
                                                className="text-gray-400"
                                            />
                                        )
                                        : null
                            )
                        }
                    </div>
                </div>
            )}

            <ReactionBar
                msg={msg}
                handleReaction={handleReaction}
            />

            <ReactionList
                reactions={msg.reactions}
            />
        </div>
    );
}