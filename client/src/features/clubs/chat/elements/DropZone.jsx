import { UploadCloud } from "lucide-react";

export default function DropZone({
    dragging,
    children,

    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop
}) {
    return (
        <div
            className="relative h-full"

            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >

            {children}

            {
                dragging && (
                    <div
                        className="
                            absolute
                            inset-0
                            z-50

                            flex
                            flex-col
                            items-center
                            justify-center

                            rounded-xl

                            border-4
                            border-dashed
                            border-blue-500

                            bg-blue-500/10
                            backdrop-blur-sm
                        "
                    >
                        <UploadCloud
                            size={64}
                            className="text-blue-600"
                        />

                        <p className="mt-4 text-2xl font-semibold">

                            Drop files to upload

                        </p>
                    </div>
                )
            }
        </div>
    );
}