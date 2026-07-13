import { useRef, useState } from "react";

import {
    Upload,
    CheckCircle2,
    Loader2,
    Image,
    Video,
    Music,
    FileText,
    File,
    X
} from "lucide-react";

import { uploadTaskAttachment } from "../../../services/taskAttachmentService";

export default function TaskUploader({
    task,
    onUploaded
}){

    const inputRef=useRef();

    const [uploading,setUploading]=useState(false);

    const [progress,setProgress]=useState(0);

    const [dragging,setDragging]=useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const icon=(file)=>{

        if(file.startsWith("image"))
            return <Image size={18}/>;

        if(file.startsWith("video"))
            return <Video size={18}/>;

        if(file.startsWith("audio"))
            return <Music size={18}/>;

        if(file.includes("pdf"))
            return <FileText size={18}/>;

        return <File size={18}/>;
    };

    const upload = async (file) => {
        if (!file) return;

        setUploading(true);
        setProgress(0);

        try {
            await uploadTaskAttachment(
                task.id,
                file,
                value => setProgress(value)
            );

            setUploadedFiles(prev => [
                ...prev,
                {
                    id: Date.now(),
                    fileName: file.name,
                    mimeType: file.type,
                    size: file.size
                }
            ]);

            setProgress(100);

            onUploaded?.();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (inputRef.current) {
                inputRef.current.value = "";
            }

            setUploading(false);
        }
    };

    return(
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">

                    Upload Attachment

                </h2>

                <button
                    onClick={()=>inputRef.current.click()}

                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        flex
                        items-center
                        gap-2
                    "
                >
                    <Upload size={18}/>

                    Upload

                </button>
            </div>

            <input
                ref={inputRef}
                type="file"
                hidden
                multiple
                onChange={async e=>{
                    const files=[...e.target.files];

                    for(const file of files){
                        await upload(file);
                    }
                }}
            />

            <div
                onDragOver={e=>{
                    e.preventDefault();
                    setDragging(true);
                }}

                onDragLeave={()=>setDragging(false)}
                onDrop={e=>{
                    e.preventDefault();
                    setDragging(false);
                    const files=[...e.dataTransfer.files];

                    for(const file of files){
                        await upload(file);
                    }
                }}

                className={`
                    border-2
                    border-dashed
                    rounded-2xl
                    h-56
                    flex
                    flex-col
                    justify-center
                    items-center
                    transition
                    ${
                        dragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                    }
                `}
            >
                <Upload size={42}/>

                <h3 className="font-semibold mt-4">

                    Drag & Drop Files

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                    or click Upload

                </p>
            </div>

            {
                uploading &&

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            Uploading...

                        </div>

                        <div>

                            {progress}%

                        </div>
                    </div>

                    {
                        uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">
                                    Uploaded Files
                                </h3>

                                {
                                    uploadedFiles.map(file => (
                                        <div
                                            key={file.id}
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                border
                                                rounded-xl
                                                p-3
                                            "
                                        >
                                            <div className="flex items-center gap-3">
                                                {
                                                    icon(
                                                        file.mimeType ||
                                                        "application/octet-stream"
                                                    )
                                                }

                                                <div>
                                                    <p className="font-medium">
                                                        {file.fileName}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {
                                                            (
                                                                (file.size || 0) /
                                                                1024
                                                            ).toFixed(1)
                                                        } KB
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setUploadedFiles(prev =>
                                                        prev.filter(
                                                            f => f.id !== file.id
                                                        )
                                                    )
                                                }
                                                className="
                                                    text-red-500
                                                    hover:text-red-700
                                                "
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                    <div className="h-2 rounded bg-gray-200">
                        <div
                            style={{

                                width:`${progress}%`

                            }}

                            className="
                                h-full
                                bg-blue-600
                                rounded
                                transition-all
                            "
                        />
                    </div>
                </div>
            }

            {
                progress===100 &&

                <div
                    className="
                        bg-green-50
                        rounded-xl
                        p-3
                        flex
                        items-center
                        gap-3
                    "
                >
                    <CheckCircle2
                        className="text-green-600"
                    />

                    Upload Complete

                </div>
            }
        </div>
    );
}