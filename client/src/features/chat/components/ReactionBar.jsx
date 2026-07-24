const emojis = [
    "👍",

    "❤️",

    "😂",

    "🎉"
];

export default function ReactionBar({
    msg,
    handleReaction
}) {
    return (
        <div className="flex gap-2 mt-2">
            {emojis.map(emoji => (
                <button
                    key={emoji}
                    onClick={() =>
                        handleReaction(
                            msg.id,
                            emoji
                        )
                    }
                >

                    {emoji}

                </button>
            ))}
        </div>
    );
}