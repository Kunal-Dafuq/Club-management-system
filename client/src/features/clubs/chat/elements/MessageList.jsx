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
    deleteForEveryone
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
                    onChange={(e)=>{
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
                <MessageBubble
                    key={msg.id}
                    msg={msg}
                    mine={msg.membership.user.id === user.id}
                    handleReaction={handleReaction}
                    setReplyingTo={setReplyingTo}
                    handleEditMessage={handleEditMessage}
                    deleteForMe={deleteForMe}
                    deleteForEveryone={deleteForEveryone}
                />
            ))}

            <div ref={bottomRef} />

        </div>
    );
}