import React from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({
    messages,
    search,
    setSearch,
    handleSearch,
    user,
    loadingMore,
    loadOlder,
    bottomRef,
    handleReaction,
    setReplyingTo,
    handleEditMessage,
    deleteForMe,
    deleteForEveryone,
    messageRefs,
    highlightedMessage,
    firstUnread
}) {
    return (
        <div
            className="h-125 overflow-y-auto border rounded-lg p-4"
            onScroll={(e) => {
                if (
                    e.currentTarget.scrollTop === 0
                ) {
                    loadOlder();
                }
            }}
        >

            {loadingMore && (
                <div className="text-center py-2">

                    Loading older messages...

                </div>
            )}

            <div className="flex gap-2">
                <input
                    className="border rounded px-3 py-2 flex-1"
                    placeholder="Search messages..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Search
                </button>
            </div>

            {messages.map(msg => (

                <React.Fragment key={msg.id}>
                
                    {
                        firstUnread === msg.id && (
                            <div
                                className="
                                    sticky
                                    top-0
                                    z-10
                                    my-3
                                    rounded-full
                                    bg-red-500
                                    py-1
                                    text-center
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                New Messages
                            </div>
                        )
                    }

                    <div
                        ref={(el) => {
                            messageRefs.current[msg.id] = el;
                        }}
                        className={`
                            rounded-xl
                            transition-all
                            duration-700
                            ${
                                highlightedMessage === msg.id
                                    ? "bg-yellow-100 ring-2 ring-yellow-400 scale-[1.02] shadow-lg p-2"
                                    : ""
                            }
                        `}
                    >
                        <MessageBubble
                            msg={msg}
                            mine={msg.membership.user.id === user.id}
                            handleReaction={handleReaction}
                            setReplyingTo={setReplyingTo}
                            deleteForMe={deleteForMe}
                            deleteForEveryone={deleteForEveryone}
                            handleEditMessage={handleEditMessage}
                        />
                    </div>
                </React.Fragment>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}