const MembersList = ({ members }) => {
    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold mb-5">
                Members
            </h2>

            <div className="space-y-4">

                {members.map(member => (

                    <div
                        key={member.id}
                        className="flex justify-between items-center border-b border-zinc-800 pb-3"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {member.user.name}
                            </h3>

                            <p className="text-sm text-zinc-500">
                                {member.user.department}
                            </p>

                        </div>

                        <span
                            className="
                            px-3
                            py-1
                            rounded-full
                            bg-violet-600"
                        >
                            {member.clubRole}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersList;