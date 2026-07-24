import SharedMedia from "./SharedMedia";

export default function MediaSidebar({
    open,
    roomId
}){
    if(!open) return null;

    return(
        <div
            className="
            w-80
            border-l
            bg-white
            overflow-y-auto
            "
        >

            <h2
                className="
                p-4
                font-bold
                text-lg
                "
            >

                Shared Media

            </h2>

            <SharedMedia roomId={roomId}/>

        </div>
    );
}