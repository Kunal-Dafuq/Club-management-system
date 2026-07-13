const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500"
];

export default function TaskLabelPicker({
    labels=[],
    selected=[],
    onChange
}){
    const toggle=(label)=>{
        if(selected.includes(label)){
            onChange(
                selected.filter(l=>l!==label)
            );
        }

        else{
            onChange([
                ...selected,
                label
            ]);
        }
    };

    return(
        <div className="flex flex-wrap gap-3">
            {
                labels.map(label=>(

                    <button
                        key={label.id}
                        onClick={()=>toggle(label.id)}
                        className={`
                            px-3
                            py-1
                            rounded-full
                            text-white
                            ${colors[label.color]}
                            ${
                                selected.includes(label.id)
                                ? "ring-4 ring-blue-300"
                                : ""
                            }
                        `}
                    >

                        {label.name}

                    </button>
                ))
            }
        </div>
    );
}