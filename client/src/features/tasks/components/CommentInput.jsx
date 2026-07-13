import {useState} from "react";

export default function CommentInput({
    onSend
}){
    const[text,setText]=useState("");

    return(
        <div className="flex gap-3">
            <textarea
                value={text}
                onChange={e=>setText(e.target.value)}
                placeholder="Write a comment..."
                className="
                    border
                    rounded-xl
                    flex-1
                    p-3
                    resize-none
                    h-24
                "
            />

            <button
                onClick={()=>{
                    if(!text.trim()) return;
                    onSend(text);
                    setText("");
                }}

                className="
                    bg-blue-600
                    text-white
                    px-5
                    rounded-xl
                "
            >

                Send

            </button>
        </div>
    );
}