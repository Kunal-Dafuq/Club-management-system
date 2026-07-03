export default function TypingIndicator({
    typingUser
}) {
    if (!typingUser) {
        return (
            <div className="h-6" />
        );
    }

    return (
        <div className="h-6 text-sm italic text-gray-500">
            {typingUser} is typing...
        </div>
    );
}