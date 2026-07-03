import { useState } from "react";
import {CheckCheck,Eye} from "lucide-react";
import ReactionBar from "./ReactionBar";
import ReactionList from "./ReactionList";

export default function MessageBubble({
    msg,
    mine,
    handleReaction,
    setReplyingTo,
    deleteForMe,
    deleteForEveryone,
    handleEditMessage
}) {

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
                    className="text-lg px-2"
                >
                    ⋮
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
                    <div className="mt-1 wrap-break-words">
                        {msg.content}
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