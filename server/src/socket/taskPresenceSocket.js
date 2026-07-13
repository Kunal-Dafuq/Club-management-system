module.exports=io=>{

    io.on("connection",socket=>{
        socket.on(
            "task-open",
            ({taskId,user})=>{
                socket.join(
                    `task-${taskId}`
                );

                socket.to(
                    `task-${taskId}`
                ).emit(
                    "presence-joined",user
                );
            }
        );

        socket.on(
            "task-close",
            ({taskId,user})=>{
                socket.leave(
                    `task-${taskId}`
                );

                socket.to(
                    `task-${taskId}`
                ).emit(
                    "presence-left",user.id
                );
            }
        )
    });
};