export default function ReplyPreview({
    replyingTo,
    clearReply
}) {

    if (!replyingTo) return null;

    return (
        <div className="border-l-4 border-blue-500 bg-gray-100 rounded p-3 mb-2">

            <div className="flex justify-between items-center">

                <div>

                    <div className="font-semibold text-sm">
                        Replying to {replyingTo.membership.user.name}
                    </div>

                    <div className="text-sm text-gray-600 truncate">
                        {replyingTo.content}
                    </div>

                </div>

                <button
                    onClick={clearReply}
                >
                    ✕
                </button>

            </div>

        </div>
    );
}