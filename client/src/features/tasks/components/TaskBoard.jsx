import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragOverlay,
    pointerWithin,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

export default function TaskBoard({ groupedTasks, onDragEnd, openTask }) {
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={({ active }) => {
                const task = Object
                    .values(groupedTasks)
                    .flat()
                    .find(t => t.id === active.id);
                setActiveTask(task);
            }}
            onDragEnd={(event) => {
                setActiveTask(null);
                const { active, over } = event;
                if (!over) return;
                if (active.id === over.id) return;
                onDragEnd(event);
            }}
            onDragCancel={() => {
                setActiveTask(null);
            }}
        >
            <div className="flex h-full w-full gap-6 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className="min-w-[320px] w-[320px] snap-center flex-shrink-0">
                        <TaskColumn
                            id={status}
                            title={status.replaceAll("_", " ")}
                            tasks={tasks}
                            openTask={openTask}
                        />
                    </div>
                ))}
            </div>

            <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
                {activeTask && (
                    <div className="rotate-3 scale-105 shadow-2xl shadow-black/50 cursor-grabbing opacity-90">
                        <TaskCard
                            task={activeTask}
                            openTask={() => {}}
                        />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}