import { useEffect, useState } from "react";
import {getPendingRequests ,approveMember ,rejectMember} from "../../services/membershipService";

const PendingRequests = ({ clubId }) => {
    const [requests, setRequests] = useState([]);
    const loadRequests = async () => {
        try {

            const response =
                await getPendingRequests(clubId);

            setRequests(response.data);
        }

        catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        if (clubId) {

            loadRequests();

        }
    }, [clubId]);

    const handleApprove = async (id) => {
        await approveMember(id);
        loadRequests();
    };

    const handleReject = async (id) => {
        await rejectMember(id);
        loadRequests();
    };

    if (!requests.length) {
        return (
            <div className="rounded-2xl bg-zinc-900 p-6">

                No pending requests.

            </div>
        );
    }

    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold mb-6">

                Pending Requests

            </h2>

            <div className="space-y-4">
                {
                    requests.map(request => (

                        <div
                            key={request.id}
                            className="
                            flex
                            justify-between
                            items-center
                            border-b
                            border-white/10
                            pb-4"
                        >

                            <div>
                                <h3>

                                    {request.user.name}

                                </h3>

                                <p className="text-zinc-500">

                                    {request.user.email}

                                </p>
                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        handleApprove(request.id)
                                    }
                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-green-600"
                                >

                                    Approve

                                </button>

                                <button
                                    onClick={() =>
                                        handleReject(request.id)
                                    }
                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-red-600"
                                >

                                    Reject

                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PendingRequests;