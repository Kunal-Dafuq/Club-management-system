export default function ReactionList({
    reactions
}) {
    if (!reactions?.length) {
        return null;
    }

    return (
        <div className="flex gap-2 mt-2 flex-wrap">
            {reactions.map(reaction => (

                <span
                    key={reaction.id}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >

                    {reaction.emoji}

                </span>
            ))}
        </div>
    );
}