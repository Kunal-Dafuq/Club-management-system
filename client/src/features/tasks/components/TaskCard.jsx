import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    Calendar,
    Flag,
    User,
    MessageSquare,
    Paperclip
} from "lucide-react";

export default function TaskCard({
    task,
    openTask
}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? .55 : 1,
        scale: isDragging ? 1.05 : 1,
        zIndex: isDragging ? 999 : 1,
        boxShadow:
            isDragging
                ? "0 35px 80px rgba(0,0,0,.35)"
                : ""
        ,
        touchAction: "none"
    };

    const statusColor = {
        BACKLOG:"bg-gray-100 text-gray-700",
        TODO:"bg-slate-100 text-slate-700",
        IN_PROGRESS:"bg-blue-100 text-blue-700",
        REVIEW:"bg-orange-100 text-orange-700",
        COMPLETED:"bg-green-100 text-green-700"
    };

    const priorityColor={
        HIGH:"bg-red-100 text-red-700",
        MEDIUM:"bg-yellow-100 text-yellow-700",
        LOW:"bg-green-100 text-green-700",
        CRITICAL:"bg-purple-100 text-purple-700"
        };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => openTask(task)}
            className="
                bg-white
                rounded-2xl
                p-4
                border

                hover:border-blue-400
                hover:-translate-y-1
                hover:shadow-2xl

                transition-all
                duration-300

                cursor-grab
                active:cursor-grabbing

                space-y-4
            "
        >

            <div className="flex justify-between">
                <h3 className="font-semibold">

                    {task.title}

                </h3>

                <div className="flex items-center gap-2">
                    <Flag
                        size={15}
                        className={
                            task.priority === "CRITICAL"
                                ? "text-purple-600"
                                : task.priority === "HIGH"
                                ? "text-red-500"
                                : task.priority === "MEDIUM"
                                ? "text-yellow-500"
                                : "text-green-500"
                        }
                    />

                    <span
                        className={`
                            px-2
                            py-0.5
                            rounded-full
                            text-[11px]
                            font-semibold
                            ${priorityColor[task.priority]}
                        `}
                    >
                        {task.priority}
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-500 line-clamp-3">

                {task.description}

            </p>

            <div className="flex justify-between text-xs">
                <div className="flex items-center gap-1">

                    <Calendar size={14}/>

                    {
                        task.dueDate
                        &&
                        new Date(task.dueDate)
                            .toLocaleDateString()
                    }
                </div>

                <div className="flex items-center gap-2">
                    <div
                        className="
                            w-7
                            h-7
                            rounded-full
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-semibold
                        "
                    >
                        {
                            task.assignedTo?.membership?.user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "?"
                        }
                    </div>

                    <span className="text-xs">

                        {
                            task.assignedTo?.membership?.user?.name ||
                            "Unassigned"
                        }

                    </span>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="flex items-center gap-1">

                        <MessageSquare size={14}/>
                        {
                            task.comments?.length || 0
                        }
                    </div>

                    <div className="flex items-center gap-1">

                        <Paperclip size={14}/>
                        {
                            task.attachments?.length || 0
                        }
                    </div>
                </div>

                <span
                    className={`
                        px-2
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${statusColor[task.status]}
                    `}
                >
                    
                    {task.status.replace("_"," ")}

                </span>
            </div>
        </div>
    );
}