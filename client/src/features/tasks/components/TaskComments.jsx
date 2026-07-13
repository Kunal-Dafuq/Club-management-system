import { useEffect, useState } from "react";
import {
    getTaskComments,
    createComment
} from "../../../services/taskCommentService";

export default function TaskComments({
    taskId
}) {
    const [comments,setComments]=useState([]);
    const [text,setText]=useState("");

    useEffect(()=>{

        load();

    },[taskId]);

    const load=async()=>{
        const res=await getTaskComments(taskId);
        setComments(res.data);
    };

    const send=async()=>{
        if(!text.trim()) return;

        await createComment(taskId,{
            content:text
        });
        setText("");
        load();
    };
    
    return(
        <div className="space-y-5">
            <div className="space-y-4">
                {
                    comments.map(comment=>(
                        <div
                            key={comment.id}
                            className="
                                border
                                rounded-xl
                                p-4
                            "
                        >
                            <div className="font-semibold">

                                {comment.membership.user.name}

                            </div>

                            <div className="text-sm mt-2">

                                {comment.content}

                            </div>
                        </div>
                    ))
                }
            </div>

            <textarea
                className="
                    border
                    rounded-xl
                    w-full
                    p-3
                    h-28
                "
                value={text}
                onChange={e=>setText(e.target.value)}
                placeholder="Write a comment..."
            />

            <button
                onClick={send}
                className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-xl
                "
            >

                Send

            </button>
        </div>
    );
}