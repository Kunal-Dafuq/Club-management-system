const Announcements = ({ announcements = [] }) => {
    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold mb-6">
                Announcements
            </h2>

            {
                announcements.length === 0 ? (

                    <p className="text-zinc-500">
                        No announcements yet.
                    </p>

                ) : (

                    <div className="space-y-5">

                        {announcements.map(item => (

                            <div
                                key={item.id}
                                className="
                                border
                                border-white/10
                                rounded-xl
                                p-4"
                            >

                                <h3 className="font-semibold text-lg">

                                    {item.title}

                                </h3>

                                <p className="text-zinc-400 mt-2">

                                    {item.content}

                                </p>

                                <p className="text-xs text-zinc-600 mt-4">

                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString()}

                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Announcements;