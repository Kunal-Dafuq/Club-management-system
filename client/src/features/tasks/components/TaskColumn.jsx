import {SortableContext,verticalListSortingStrategy} from "@dnd-kit/sortable";

import {useDroppable} from "@dnd-kit/core";

import TaskCard from "./TaskCard";
import TaskHeader from "./TaskHeader";

const colors={
    BACKLOG:"border-gray-300",
    TODO:"border-blue-400",
    IN_PROGRESS:"border-yellow-400",
    REVIEW:"border-purple-400",
    COMPLETED:"border-green-400"
};

export default function TaskColumn({
    id,
    title,
    tasks,
    openTask
}){
    const{setNodeRef,isOver}=useDroppable({id});

    return(
        <div
            ref={setNodeRef}
            className={`
                flex
                flex-col
                rounded-2xl
                border-2
                ${colors[id]}
                bg-gray-50
                min-h-[650px]
                transition-all
                duration-200
                ${isOver?"scale-[1.02] shadow-xl bg-blue-50":""}
            `}
        >
            <div
                className="
                    sticky
                    top-0
                    bg-white
                    rounded-t-2xl
                    p-4
                    border-b
                    flex
                    justify-between
                    items-center
                "
            >
                <TaskHeader
                    title={title}
                    count={tasks.length}
                    onCreate={()=>{}}
                />

                <span
                    className="
                        bg-blue-100
                        rounded-full
                        px-3
                        py-1
                        text-xs
                    "
                >
                    {tasks.length}
                </span>
            </div>
            
            <SortableContext
                items={tasks.map(t=>t.id)}
                strategy={verticalListSortingStrategy}
            >

                <div
                    className="
                        flex-1
                        p-3
                        space-y-3
                    "
                >
                    {
                        tasks.length===0 &&

                        <div
                            className="
                                h-32
                                flex
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
                                border-2
                                border-dashed
                                border-gray-300
                                text-gray-400
                                text-sm
                            "
                        >

                            📥

                            <p className="mt-2">

                                Drop task here

                            </p>
                        </div>
                    }

                    {
                        tasks.map(task=>(
                            <TaskCard
                                key={task.id}
                                task={task}
                                openTask={openTask}
                            />
                        ))
                    }
                </div>
            </SortableContext>
        </div>
    );
}