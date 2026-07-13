import { useParams } from "react-router-dom";

import useTasks from "../hooks/useTasks";
import TaskBoard from "../features/tasks/components/TaskBoard";''

export default function Tasks(){
    const {committeeId} = useParams();

    const [activeTask,setActiveTask] = useState(null);

    const{
        tasks,
        loading,
        groupedTasks,
        reorderTask,
        setTasks
    }=useTasks(committeeId);

    if(loading){
        return(
            <div className="p-10">

                Loading...

            </div>
        );
    }

    const handleDragStart = event => {
        const task = tasks.find(
            t=>t.id===event.active.id
        );

        setActiveTask(task);

    };

    return(
        <div className="p-6">
            <TaskBoard
                groupedTasks={groupedTasks}
                onDragEnd={handleDragEnd}
            />

            <TaskDragOverlay
                activeTask={activeTask}
            />
        </div>
    );
}