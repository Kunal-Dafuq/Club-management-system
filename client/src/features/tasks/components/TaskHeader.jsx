import { Plus } from "lucide-react";

export default function TaskHeader({
    title,
    count,
    onCreate
}){
    return(
        <div
            className="
                flex
                justify-between
                items-center
                mb-4
            "
        >
            <div>
                <h2 className="font-bold">

                    {title}

                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                    "
                >
                    {count} Tasks
                </p>
            </div>

            <button
                onClick={onCreate}
                className="
                    bg-blue-600
                    text-white
                    p-2
                    rounded-xl
                "
            >
                <Plus size={18}/>
            </button>
        </div>
    );
}