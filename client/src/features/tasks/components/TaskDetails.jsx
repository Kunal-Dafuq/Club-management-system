import { Calendar, Flag, User, Clock, Layers } from "lucide-react";
import TaskMembers from "./TaskMembers";
import TaskChecklist from "./TaskChecklist";
import TaskAttachments from "./TaskAttachments";
import TaskActivity from "./TaskActivity";
import TaskComments from "./TaskComments";

export default function TaskDetails({ task, refresh }) {
    if (!task) {
        return (
            <div className="p-12 flex flex-col items-center justify-center text-center text-zinc-500 h-full border-2 border-dashed border-zinc-800 rounded-3xl">
                <Layers size={48} className="mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-zinc-300">Select a task</h2>
                <p className="mt-2 text-sm">Click on any task card to view its details, attachments, and activity.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-zinc-950 min-h-full text-zinc-100">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white leading-snug">
                    {task.title}
                </h1>
                <p className="mt-4 text-zinc-400 leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                    {task.description || "No detailed description provided."}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Flag size={14} /> Priority
                    </span>
                    <span className="text-sm font-medium">{task.priority}</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={14} /> Status
                    </span>
                    <span className="text-sm font-medium">{task.status.replace("_", " ")}</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={14} /> Due Date
                    </span>
                    <span className="text-sm font-medium">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                    </span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <User size={14} /> Assignee
                    </span>
                    <span className="text-sm font-medium truncate">
                        {task.assignedTo?.membership?.user?.name || "Unassigned"}
                    </span>
                </div>
            </div>

            <div className="h-px w-full bg-zinc-800 my-8"></div>

            <div className="space-y-10">
                <TaskMembers task={task} refresh={refresh} />
                <TaskChecklist task={task} refresh={refresh} />
                <TaskAttachments task={task} refresh={refresh} />
                <TaskComments taskId={task.id} />
                <TaskActivity task={task} />
            </div>
        </div>
    );
}