export default function moveTask(
    tasks,
    taskId,
    newStatus,
    position
){
    return tasks.map(task=>
        task.id===taskId
            ?{
                ...task,
                status:newStatus,
                position
            }
            :task
    );
}