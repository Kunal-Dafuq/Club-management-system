export default function groupTasks(tasks){
    const groups={
        BACKLOG:[],
        TODO:[],
        IN_PROGRESS:[],
        REVIEW:[],
        COMPLETED:[]
    };

    tasks.forEach(task=>{
        if(groups[task.status]){
            groups[task.status].push(task);
        }
    });

    const status=task.status || "TODO";

    if(groups[status]){
        groups[status].push(task);
    }

    return groups;
}