import {

    DragOverlay

} from "@dnd-kit/core";

import TaskCard from "./TaskCard";

export default function TaskDragOverlay({
    activeTask
}){
    return(
        <DragOverlay>
            {
                activeTask
                &&

                <div
                    className="
                        rotate-2
                        scale-105
                    "
                >
                    <TaskCard

                        task={activeTask}

                    />
                </div>
            }
        </DragOverlay>
    );
}