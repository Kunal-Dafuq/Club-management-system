import {Search} from "lucide-react";

export default function TaskSearch({
    value,
    onChange
}){
    return(
        <div
            className="
                relative
                w-80
            "
        >
            <Search
                className="
                    absolute
                    left-3
                    top-3
                    text-gray-400
                "
                size={18}
            />

            <input
                value={value}
                onChange={e=>
                    onChange(e.target.value)
                }
                placeholder="Search task..."
                className="
                    border
                    rounded-xl
                    pl-10
                    py-3
                    w-full
                "
            />
        </div>
    );
}