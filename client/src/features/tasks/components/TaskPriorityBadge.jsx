const styles={
    LOW:"bg-green-100 text-green-700",
    MEDIUM:"bg-yellow-100 text-yellow-700",
    HIGH:"bg-red-100 text-red-700",
    CRITICAL:"bg-purple-100 text-purple-700"
};

export default function TaskPriorityBadge({
    priority
}){
    return(
        <span
            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${styles[priority]}
            `}
        >

            {priority}

        </span>
    );
}