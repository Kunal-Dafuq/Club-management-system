import { useEffect, useState, useCallback } from "react";

import {
    getCommitteeTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    reorderTask
} from "../../services/taskService";
import groupTasks from "../utils/groupTasks";

import { getSocket } from "../../socket/socket";

export default function useTasks(committeeId){
    const socket=getSocket();

    const [tasks,setTasks]=useState([]);

    const [loading,setLoading]=useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try{
            const res = await getCommitteeTasks(
                committeeId
            );
            setTasks(res.data);
        }

        finally{
            setLoading(false);
        }

    },[committeeId]);

    const groupedTasks = groupTasks(tasks); 

    useEffect(()=>{
        refresh();
        socket.emit(
            "join-committee",
            committeeId
        );

        // socket.on("task-created",task=>{
        //     setTasks(prev=>[
        //         ...prev,
        //         task
        //     ]);
        // });

        // socket.on("task-updated", updated => {
        //     setTasks(prev =>
        //         prev.map(task =>
        //             task.id === updated.id
        //                 ? { ...task, ...updated }
        //                 : task
        //         )
        //     );
        // });

        // socket.on("task-deleted",id=>{
        //     setTasks(prev=>
        //         prev.filter(
        //             task=>task.id!==id
        //         )
        //     );
        // });

        // socket.on("connect",()=>{
        //     socket.emit(
        //         "join-committee",
        //         committeeId
        //     );
        // });

        return()=>{
            socket.emit(
                "leave-committee",
                committeeId
            );

            socket.off("task-created");
            socket.off("task-updated");
            socket.off("task-deleted");
        };
    },[committeeId , refresh]);

    return{
        tasks,
        groupedTasks,
        loading,
        refresh,
        setTasks,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        reorderTask
    };
}