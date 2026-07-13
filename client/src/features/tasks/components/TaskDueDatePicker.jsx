import {Calendar} from "lucide-react";

export default function TaskDueDatePicker({
    value,
    onChange
}){
    return(
        <div>
            <label
                className="
                    flex
                    gap-2
                    mb-2
                    items-center
                "
            >
                <Calendar size={18}/>

                Due Date

            </label>

            <input
                type="date"
                value={value}
                onChange={e=>
                    onChange(e.target.value)
                }

                className="
                    border
                    rounded-xl
                    p-3
                    w-full
                "
            />
        </div>
    );
}