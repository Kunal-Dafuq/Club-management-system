import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pin } from "lucide-react";
import { getPinnedMessages } from "../services/chatService";

export default function PinnedMessages() {
    const { roomId } = useParams();

    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPins();
    }, []);

    async function loadPins() {
        try {
            const data = await getPinnedMessages(roomId);
            setPins(data.pins || []);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="p-6">
                Loading pinned messages...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
                <Pin />
                Pinned Messages
            </h1>

            {
                pins.length === 0 && (
                    <div className="text-gray-500">
                        No pinned messages.
                    </div>
                )
            }

            {
                pins.map(pin => (

                    <div
                        key={pin.id}
                        className="border rounded-xl p-4 mb-4 shadow-sm bg-white"
                    >

                        <div className="flex justify-between">
                            <div>

                                <h3 className="font-semibold">
                                    {pin.message.membership.user.name}
                                </h3>

                                <p className="mt-2">
                                    {pin.message.content}
                                </p>
                            </div>

                            <Pin className="text-blue-600"/>

                        </div>

                        <div className="mt-3 text-sm text-gray-500">

                            Pinned by

                            {" "}

                            <b>

                                {pin.pinnedBy.user.name}

                            </b>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}