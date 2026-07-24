const RecentActivity = ({ activities = [] }) => {
    return (
        <div className="rounded-2xl bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold mb-6">

                Recent Activity

            </h2>

            {

                activities.length === 0 ? (

                    <p className="text-zinc-500">

                        No activity yet.

                    </p>

                ) : (

                    <div className="space-y-4">
                        {
                            activities.map(activity => (

                                <div
                                    key={activity.id}
                                    className="
                                    flex
                                    items-start
                                    gap-4
                                    border-b
                                    border-white/10
                                    pb-4"
                                >

                                    <div
                                        className="
                                        w-3
                                        h-3
                                        rounded-full
                                        bg-violet-500
                                        mt-2"
                                    />

                                    <div>
                                        <p>

                                            {activity.text}

                                        </p>

                                        <p
                                            className="
                                            text-xs
                                            text-zinc-500"
                                        >

                                            {activity.time}

                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default RecentActivity;