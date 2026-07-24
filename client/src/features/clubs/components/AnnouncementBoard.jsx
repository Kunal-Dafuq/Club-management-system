const AnnouncementBoard = ({ announcements }) => {
    return (
        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold">

                Announcements

            </h2>

            <div className="space-y-5 mt-6">

                {announcements.map(item=>(

                    <div
                        key={item.id}
                        className="border-b border-zinc-800 pb-4"
                    >

                        <h3 className="font-semibold">

                            {item.title}

                        </h3>

                        <p className="text-zinc-400 mt-2">

                            {item.content}

                        </p>

                        <p className="text-xs text-zinc-600 mt-3">

                            by {item.creator.name}

                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementBoard;