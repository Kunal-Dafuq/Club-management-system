import {Eye} from "lucide-react";

export default function TaskPresence({
    users=[]
}){
    return(
        <div
            className="
                flex
                items-center
                gap-3
            "
        >
            <Eye size={18}/>

            {
                users.map(user=>(
                    <div
                        key={user.id}
                        className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xs
                        "
                    >
                        {
                            user.name
                            .charAt(0)
                        }
                    </div>
                ))
            }
        </div>
    );
}