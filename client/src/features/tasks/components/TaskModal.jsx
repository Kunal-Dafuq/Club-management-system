import { useState, useEffect } from "react";

import TaskUploader from "./TaskUploader";
import TaskAttachments from "./TaskAttachments";
import TaskActivity from "./TaskActivity";
import TaskComments from "./TaskComments";
import TaskMembers from "./TaskMembers";

export default function TaskModal({
    open,
    onClose,
    onSave,
    initialData
}) {
    const [tab,setTab]=useState("overview");

    const [form,setForm]=useState({
        title:"",
        description:"",
        priority:"MEDIUM",
        dueDate:""
    });

    useEffect(()=>{
        if(initialData){
            setForm({
                title:initialData.title,
                description:initialData.description||"",
                priority:initialData.priority,
                dueDate:initialData.dueDate?.slice(0,10)||""
            });
        }
    },[initialData]);

    if(!open) return null;

    return(
        <div
            className="
                fixed
                inset-0
                bg-black/40
                z-50
                flex
                justify-end
            "
        >

            <div
                className="
                    h-full
                    w-[650px]
                    bg-white
                    shadow-2xl
                    overflow-y-auto
                    animate-slideIn
                "
            >

                <div
                    className="
                        sticky
                        top-0
                        bg-white
                        border-b
                        p-6
                        flex
                        justify-between
                        items-center
                    "
                >
                    <div>
                        <h2 className="text-2xl font-bold">
                            {
                                initialData

                                    ? "Task Details"
                                    : "Create Task"
                            }
                        </h2>

                        <p className="text-sm text-gray-500">

                            Committee Task

                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >

                        ✕

                    </button>
                </div>

                <div
                    className="
                        p-6
                        space-y-6
                    "
                >
                    <input
                        className="border rounded w-full p-3"
                        placeholder="Title"
                        value={form.title}
                        onChange={e=>
                            setForm({
                                ...form,
                                title:e.target.value
                            })
                        }
                    />

                    <textarea
                        className="border rounded w-full p-3 h-32"
                        placeholder="Description"
                        value={form.description}
                        onChange={e=>
                            setForm({
                                ...form,
                                description:e.target.value
                            })
                        }
                    />

                    <div>
                        <label
                            className="text-sm font-semibold"
                        >
                            Priority

                        </label>

                        <select

                            className="
                                border
                                rounded-xl
                                w-full
                                mt-2
                                p-3
                                "
                            value={form.priority}
                            onChange={e=>
                                setForm({
                                    ...form,
                                    priority:e.target.value
                                })
                            }
                        >
                            <option>LOW</option>
                            <option>MEDIUM</option>
                            <option>HIGH</option>
                            <option>CRITICAL</option>
                        </select>
                    </div>

                    <input
                        type="date"
                        className="border rounded w-full p-3"
                        value={form.dueDate}
                        onChange={e=>
                            setForm({
                                ...form,
                                dueDate:e.target.value
                            })
                        }
                    />
                </div>

                <div
                    className="
                        grid
                        grid-cols-3
                        gap-3
                    "
                >
                    <div
                        className="bg-gray-100 rounded-xl p-4"
                    >

                        <p className="text-xs">

                            Comments

                        </p>

                        <h2 className="text-xl font-bold">
                            {
                                initialData?.comments?.length || 0
                            }
                        </h2>

                    </div>

                    <div
                        className="bg-gray-100 rounded-xl p-4"
                    >

                        <p className="text-xs">

                            Attachments

                        </p>

                        <h2 className="text-xl font-bold">
                            {
                                initialData?.attachments?.length || 0
                            }
                        </h2>

                    </div>

                    <div
                        className="bg-gray-100 rounded-xl p-4"
                    >

                        <p className="text-xs">

                            Activity

                        </p>

                        <h2 className="text-xl font-bold">
                            {
                                initialData?.activities?.length || 0
                            }
                        </h2>
                    </div>
                </div>

                <div
                    className="
                        flex
                        border-b
                        mt-8
                        "
                    >

                    <button
                        onClick={()=>setTab("overview")}
                        className={`
                            px-5
                            py-3
                            ${
                                tab==="overview"
                                    ?"border-b-2 border-blue-500 font-semibold"
                                    :"text-gray-500"
                            }
                        `}
                    >
                        Overview
                    </button>

                    <button
                        onClick={()=>setTab("comments")}
                        className={tab==="comments"
                            ?"border-b-2 border-blue-500 font-semibold px-5 py-3"
                            :"px-5 py-3 text-gray-500"}
                    >
                        Comments
                    </button>

                    <button
                        onClick={()=>setTab("attachments")}
                        className={tab==="attachments"
                            ?"border-b-2 border-blue-500 font-semibold px-5 py-3"
                            :"px-5 py-3 text-gray-500"}
                    >
                        Attachments
                    </button>

                    <button
                        onClick={()=>setTab("activity")}
                        className={tab==="activity"
                            ?"border-b-2 border-blue-500 font-semibold px-5 py-3"
                            :"px-5 py-3 text-gray-500"}
                    >
                        Activity
                    </button>

                </div>

                <div className="p-6">
                    {
                        tab==="overview" &&
                        <>
                            <TaskMembers task={initialData}/>
                            <div className="my-8"/>
                            <TaskUploader task={initialData}/>
                        </>
                    }

                    {
                        tab==="comments" &&
                        <TaskComments task={initialData}/>
                    }

                    {
                        tab==="attachments" &&
                        <TaskAttachments task={initialData}/>
                    }
                    
                    {
                        tab==="activity" &&
                        <TaskActivity task={initialData}/>
                    }
                </div>
            </div>
        </div>
    );
}