import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragOverlay,
    pointerWithin,
} from "@dnd-kit/core";

import {
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import { useState } from "react";

import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

export default function TaskBoard({
    groupedTasks,
    onDragEnd,
    openTask
}){
    const [activeTask,setActiveTask]=useState(null);

    const sensors=useSensors(

        useSensor(PointerSensor,{
            activationConstraint:{
                distance:5
            }
        }),

        useSensor(KeyboardSensor,{
            coordinateGetter:sortableKeyboardCoordinates
        })
    );

    return(
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={({active})=>{
                const task=Object
                    .values(groupedTasks)
                    .flat()
                    .find(t=>t.id===active.id);
                setActiveTask(task);
            }}

            onDragEnd={(event)=>{
                setActiveTask(null);

                const {active,over}=event;
                if(!over) return;

                if(active.id===over.id) return;

                onDragEnd(event);
            }}

            onDragCancel={()=>{
                setActiveTask(null);
            }}
        >

            <div
                className="
                    grid
                    grid-cols-5
                    gap-5
                    h-full
                "
            >
                {
                    Object.entries(groupedTasks).map(
                        ([status,tasks])=>(
                            <TaskColumn
                                key={status}
                                id={status}
                                title={
                                    status
                                        .replaceAll("_"," ")
                                }
                                tasks={tasks}
                                openTask={openTask}
                            />
                        )
                    )
                }
            </div>

            <DragOverlay>
                {
                    activeTask &&

                    <div className="rotate-2 scale-105">
                        <TaskCard
                            task={activeTask}
                            openTask={()=>{}}
                            style={{ transition: "transform 200ms cubic-bezier(.2,.8,.2,1)" }}
                        />
                    </div>
                }
            </DragOverlay>
        </DndContext>
    );
}