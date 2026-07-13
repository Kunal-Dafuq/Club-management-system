import {useState} from "react";

export default function TaskChecklist(){
    const [items,setItems]=useState([]);

    const add=()=>{
        setItems([
            ...items,
            {
                title:"",
                done:false
            }
        ]);
    };

    return(
        <div>
            {
                items.map((item,index)=>(
                    <div
                        key={index}
                        className="
                            flex
                            gap-3
                            mb-3
                        "
                    >
                        <input
                            type="checkbox"
                        />

                        <input
                            className="
                                border
                                rounded
                                p-2
                                flex-1
                            "
                        />
                    </div>
                ))
            }

            <button
                onClick={add}
                className="
                    bg-gray-200
                    rounded-lg
                    px-4
                    py-2
                "
            >

                + Checklist Item

            </button>
        </div>
    );
}