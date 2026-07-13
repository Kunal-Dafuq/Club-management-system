import {

    Upload,

    Paperclip

} from "lucide-react";

export default function TaskAttachments({
    task
}){
    return(
        <div>
            <div
                className="
                    flex
                    justify-between
                    mb-4
                "
            >

                <h2 className="font-semibold">

                    Attachments

                </h2>

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                    "
                >
                    <Upload size={16}/>

                    Upload

                </button>
            </div>

            <div className="space-y-3">
                {
                    task.attachments?.map(file=>(
                        <div
                            key={file.id}
                            className="
                                flex
                                justify-between
                                p-3
                                border
                                rounded-xl
                            "
                        >
                            <div className="flex gap-3">
                                <Paperclip/>

                                {file.fileName}

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}