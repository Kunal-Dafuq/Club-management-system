import {Search,Pin,Images} from "lucide-react";

export default function ChatHeader({
    clubName = "Club Chat",
    onlineUsers = [],
    onSearch,
    onOpenPins,
    children
}) {
    return (
        <div
            className="
            flex
            items-center
            justify-between
            border-b
            bg-white
            px-5
            py-3
            "
        >

            <div>
                <h2 className="text-lg font-bold">
                    {clubName}
                </h2>

                <p className="text-xs text-gray-500">

                    {onlineUsers.length} online

                </p>
            </div>

            <div className="flex items-center gap-2">

                <button
                    onClick={onSearch}
                    className="
                    rounded-lg
                    p-2
                    hover:bg-gray-100
                    "
                >
                    <Search size={18}/>
                </button>

                <button
                    onClick={onOpenPins}
                    className="
                    rounded-lg
                    p-2
                    hover:bg-gray-100
                    "
                >
                    <Pin size={18}/>
                </button>

                <button
                    className="
                    rounded-lg
                    p-2
                    hover:bg-gray-100
                    "
                >
                    <Images size={18}/>
                </button>

                {children}

            </div>
        </div>
    );
}