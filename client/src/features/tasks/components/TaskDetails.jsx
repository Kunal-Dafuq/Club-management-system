import {
    Calendar,
    Flag,
    User,
    Clock
} from "lucide-react";

import TaskMembers from "./TaskMembers";
import TaskChecklist from "./TaskChecklist";
import TaskAttachments from "./TaskAttachments";
import TaskActivity from "./TaskActivity";
import TaskComments from "./TaskComments";

export default function TaskDetails({
    task,
    refresh
}){
    if(!task){
        return(
            <div className="p-8">

                Select a task

            </div>
        );
    }

    return(
        <div
            className="
                space-y-8
                p-6
            "
        >
            <div>
                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >

                    {task.title}

                </h1>

                <p
                    className="
                        mt-3
                        text-gray-500
                    "
                >

                    {task.description}

                </p>
            </div>

            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                "
            >
                <div className="flex items-center gap-2">
                    <Flag/>
                    {task.priority}
                </div>

                <div className="flex items-center gap-2">
                    <Calendar/>

                    {
                        task.dueDate &&
                        new Date(task.dueDate)
                        .toLocaleDateString()
                    }
                </div>

                <div className="flex items-center gap-2">
                    <Clock/>
                    {task.status}
                </div>

                <div className="flex items-center gap-2">
                    <User/>

                    {
                        task.assignedTo?.membership?.user?.name ||
                        "Unassigned"
                    }
                </div>
            </div>

            <TaskMembers
                task={task}
                refresh={refresh}
            />

            <TaskChecklist
                task={task}
                refresh={refresh}
            />

            <TaskAttachments
                task={task}
                refresh={refresh}
            />

            <TaskComments
                taskId={task.id}
            />

            <TaskActivity
                task={task}
            />
        </div>
    );
}