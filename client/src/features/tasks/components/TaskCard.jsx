import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Flag, MessageSquare, Paperclip } from "lucide-react";

export default function TaskCard({ task, openTask }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 1,
        touchAction: "none"
    };

    const statusColor = {
        BACKLOG: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        TODO: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        IN_PROGRESS: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        REVIEW: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20"
    };

    const priorityColor = {
        HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        MEDIUM: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        LOW: "bg-green-500/10 text-green-400 border-green-500/20",
        CRITICAL: "bg-red-500/10 text-red-400 border-red-500/20 shadow-sm shadow-red-900/20"
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "COMPLETED";

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => openTask(task)}
            className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800 hover:border-violet-500/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 cursor-grab active:cursor-grabbing space-y-4 group"
        >
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-zinc-100 leading-tight group-hover:text-violet-300 transition-colors">
                    {task.title}
                </h3>
                <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${priorityColor[task.priority]}`}>
                    {task.priority}
                </span>
            </div>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {task.description || "No description provided."}
            </p>

            <div className="flex justify-between items-end pt-2 border-t border-zinc-800/50">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-zinc-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5" title="Comments">
                            <MessageSquare size={14} />
                            <span>{task.comments?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Attachments">
                            <Paperclip size={14} />
                            <span>{task.attachments?.length || 0}</span>
                        </div>
                    </div>

                    {task.dueDate && (
                        <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-zinc-500'}`}>
                            <Calendar size={13} />
                            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div
                        className="w-7 h-7 rounded-full bg-violet-600 border-2 border-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-sm"
                        title={task.assignedTo?.membership?.user?.name || "Unassigned"}
                    >
                        {task.assignedTo?.membership?.user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                </div>
            </div>
        </div>
    );
}