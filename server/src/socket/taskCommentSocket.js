module.exports=io=>{

    io.on("connection",socket=>{
        socket.on(
            "comment-added",
            data=>{
                io.to(
                    `task-${data.taskId}`
                ).emit(
                    "comment-added",data
                );
            }
        );

        socket.on(
            "typing-comment",
            data=>{
                socket.to(
                    `task-${data.taskId}`
                ).emit(
                    "typing-comment",data
                );
            }
        );
    });
};