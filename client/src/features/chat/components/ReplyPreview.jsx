import { X, Reply } from "lucide-react";

export default function ReplyPreview({ replyingTo, clearReply }) {
    if (!replyingTo) return null;

    return (
        <div className="px-4 py-2 bg-zinc-900/90 backdrop-blur border-t border-zinc-800">
            <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 relative">
                <div className="mt-0.5 text-violet-400">
                    <Reply size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-violet-400 mb-0.5">
                        Replying to {replyingTo.membership.user.name}
                    </div>
                    <div className="text-sm text-zinc-300 truncate">
                        {replyingTo.content || "Attachment"}
                    </div>
                </div>

                <button
                    onClick={clearReply}
                    className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    <X size={14} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}