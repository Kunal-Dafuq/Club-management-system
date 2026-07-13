import { useEffect,useState } from "react";

import { getTaskActivity }
from "../../../services/activityService";

export default function TaskActivity({
    taskId
}){
    const [activity,setActivity]=useState([]);

    useEffect(()=>{

        load();

    },[taskId]);

    const load=async()=>{
        const res=await getTaskActivity(taskId);
        setActivity(res.data);
    };

    return(
        <div className="space-y-4">
            {
                activity.map(item=>(

                    <div
                        key={item.id}
                        className="
                            border-l-4
                            border-blue-500
                            pl-4
                        "
                    >
                        <div className="font-medium">

                            {item.description}

                        </div>

                        <div
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            {
                                new Date(
                                    item.createdAt
                                ).toLocaleString()
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}