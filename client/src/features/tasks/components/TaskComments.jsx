import { useEffect, useState } from "react";
import { Send, MessageSquareText } from "lucide-react";
import { getTaskComments, createComment } from "../services/taskCommentService";

export default function TaskComments({ taskId }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, [taskId]);

    const load = async () => {
        try {
            const res = await getTaskComments(taskId);
            setComments(res.data || []);
        } catch (error) {
            console.error("Failed to load comments", error);
        }
    };

    const send = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            await createComment(taskId, { content: text });
            setText("");
            await load();
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquareText size={20} className="text-violet-400" />
                Comments
            </h3>

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-zinc-500 text-sm italic">No comments yet. Be the first to discuss this task.</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                                {comment.membership?.user?.name?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm p-4">
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="font-semibold text-sm text-zinc-200">
                                        {comment.membership?.user?.name || "Unknown User"}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-400 whitespace-pre-wrap leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="relative mt-6">
                <textarea
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 pr-16 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none min-h-[100px] transition-all"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write a comment or update..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            send();
                        }
                    }}
                />
                <button
                    onClick={send}
                    disabled={!text.trim() || loading}
                    className="absolute bottom-4 right-4 p-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    title="Send Comment"
                >
                    <Send size={16} className={loading ? "animate-pulse" : ""} />
                </button>
            </div>
        </div>
    );
}