import { UserPlus } from "lucide-react";

export default function TaskMembers({
    task
}){
    return(
        <div>
            <div
                className="
                    flex
                    justify-between
                    mb-3
                "
            >
                <h2 className="font-semibold">

                    Members

                </h2>

                <button
                    className="
                        p-2
                        rounded-xl
                        bg-blue-600
                        text-white
                    "
                >
                    <UserPlus size={18}/>
                </button>
            </div>

            <div className="flex gap-3">
                {
                    task.assignedTo ? (

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-blue-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    font-semibold
                                "
                            >

                                {
                                    task.assignedTo.membership.user.name
                                        .charAt(0)
                                        .toUpperCase()
                                }

                            </div>

                            <div>

                                <p className="font-semibold">

                                    {
                                        task.assignedTo.membership.user.name
                                    }

                                </p>

                                <p className="text-xs text-gray-500">

                                    Assigned Member

                                </p>

                            </div>

                        </div>

                    ) : (

                        <p className="text-gray-400">

                            No member assigned

                        </p>

                    )}
            </div>
        </div>
    );
}