import { X, Pin } from "lucide-react";

export default function PinnedMessagesDrawer({
    open,
    onClose,
    pins,
    onJump,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">

            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            <div className="absolute right-0 top-0 h-full w-105 bg-white shadow-2xl flex flex-col">
                <div className="flex justify-between items-center p-5 border-b">
                    <div className="flex items-center gap-2">

                        <Pin size={20} />

                        <h2 className="text-xl font-bold">

                            Pinned Messages

                        </h2>
                    </div>

                    <button onClick={onClose}>

                        <X />

                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">

                    {pins.length === 0 && (

                        <div className="text-center mt-10 text-gray-500">

                            No pinned messages.

                        </div>

                    )}

                    {pins.map(pin => (

                        <button
                            key={pin.id}
                            onClick={() => onJump(pin.message.id)}
                            className="
                                w-full
                                text-left
                                p-4
                                border-b
                                hover:bg-gray-100
                                transition
                            "
                        >

                            <div className="font-semibold">

                                {pin.message.membership.user.name}

                            </div>

                            <div className="truncate text-gray-600 mt-1">

                                {pin.message.content}

                            </div>

                            <div className="text-xs text-gray-400 mt-2">

                                {new Date(
                                    pin.createdAt
                                ).toLocaleString()}

                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}