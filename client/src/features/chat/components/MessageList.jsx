export default function ReactionList({ reactions }) {
    if (!reactions?.length) return null;

    return (
        <div className="flex gap-1.5 mt-2 flex-wrap">
            {reactions.map(reaction => (
                <span
                    key={reaction.id}
                    className="px-2 py-0.5 bg-zinc-950/40 border border-black/10 rounded-full text-xs shadow-sm"
                >
                    {reaction.emoji}
                </span>
            ))}
        </div>
    );
}