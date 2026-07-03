import { useEffect, useRef, useState } from "react";

import { getSocket } from "../../../socket/socket";
import {getClubMessages, toggleReaction} from "../../../services/chatService";

import useClubChat from "../../../hooks/useClubChat";

import ChatHeader from "./ChatHeader";
import MessageList from "./elements/MessageList";
import TypingIndicator from "./elements/TypingIndicator";
import ChatInput from "./ChatInput";
import ReplyPreview from "./elements/ReplyPreview";
import{ deleteForMe , deleteForEveryone }from "../../../services/chatService";
import { editMessage } from "../../../services/chatService";
import {searchMessages} from "../../../services/chatService";

export default function ClubChat({
    clubId,
    token,
    user
}) {
    const socket = getSocket();

    useClubChat(clubId, token);

    const bottomRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    const [typingUser, setTypingUser] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [sending, setSending] = useState(false);

    const [loadingMore, setLoadingMore] = useState(false);

    const [hasMore, setHasMore] = useState(true);

    const [replyingTo, setReplyingTo] = useState(null);

    const [search,setSearch]=useState("");

    const [searchResults,setSearchResults]=useState([]);

    useEffect(() => {
        if (!socket || !clubId) return;

        const loadMessages = async () => {
            try {
                const res = await getClubMessages(clubId);

                setMessages(res.data);

                if (res.data.length < 30) {
                    setHasMore(false);
                }
            }

            catch (err) {
                console.error(err);
            }
        };

        loadMessages();

        socket.on("new-message", message => {
            setMessages(prev => [
                ...prev,
                message
            ]);

            if (message.membership.user.id !== user.id) {
                socket.emit(
                    "message-delivered",
                    message.id
                );
            }
        });

        socket.on("reaction-updated", messages => {
            setMessages(messages);
        });

        socket.on(
            "message-edited",
            updated => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === updated.id
                            ? updated
                            : msg
                    )
                );
            }
        );

        socket.on(
            "message-deleted",
            updatedMessage=>{
                setMessages(prev=>
                    prev.map(message=>
                        message.id===updatedMessage.id
                            ? updatedMessage
                            : message
                    )
                );
            }
        );

        socket.on("online-users", users => {
            setOnlineUsers(users);
        });

        socket.on("user-typing", data => {
            if (data.roomId !== clubId) return;

            setTypingUser(data.name);

            setTimeout(() => {
                setTypingUser(null);
            }, 1200);
        });

        socket.on("message-status", (updated) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === updated.id
                        ? updated
                        : msg
                )
            );
        });

        return ()=>{
            socket.off("new-message");
            socket.off("reaction-updated");
            socket.off("online-users");
            socket.off("user-typing");
            socket.off("message-edited");
            socket.off("message-deleted");
            socket.off("message-status");
        };
    }, [clubId, socket]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

        messages.forEach(msg => {
            if (
                msg.membership.user.id !== user.id &&
                !msg.readAt
            ) {
                socket.emit(
                    "message-read",
                    msg.id
                );
            }
        });
    }, [messages]);

    const send = async () => {

        if (!text.trim()) return;

        setSending(true);

        socket.emit("send-message",{
            roomId: clubId,
            content: text,
            replyToId: replyingTo?.id || null
        });

        setText("");
        setReplyingTo(null);
        setSending(false);
    };

    const loadOlder = async () => {

        if (loadingMore) return;

        if (!hasMore) return;

        if (!messages.length) return;

        setLoadingMore(true);

        try {
            const oldest = messages[0];

            const res = await getClubMessages(
                clubId,
                oldest.id
            );

            if (res.data.length < 30) {
                setHasMore(false);
            }

            setMessages(prev => [
                ...res.data,
                ...prev
            ]);
        }

        finally {
            setLoadingMore(false);
        }
    };

    const handleReaction = async (
        messageId,
        emoji
    ) => {
        try {
            await toggleReaction(
                messageId,
                clubId,
                emoji
            );

            const res = await getClubMessages(clubId);

            setMessages(res.data);
        }

        catch (err) {
            console.error(err);
        }
    };

    const handleEditMessage = async (
        messageId,
        content
    ) => {
        try {
            await editMessage(
                messageId,
                content
            );
        }

        catch (err) {
            console.error(err);
        }
    };

    const handleDeleteForMe=async(messageId)=>{
        try{
            await deleteForMe(messageId);
            setMessages(prev=>
                prev.filter(msg=>
                    msg.id!==messageId
                )
            );
        }

        catch(err){
            console.error(err);
        }
    };

    const handleDeleteForEveryone=async(messageId)=>{
        try{
            await deleteForEveryone(messageId);
        }

        catch(err){
            console.error(err);
        }
    };

    const handleSearch=async()=>{
        if(!search.trim()){
            setSearchResults([]);
            return;
        }

        const res=await searchMessages(
            clubId,
            search
        );

        setSearchResults(res.data);

    };

    return (
        <div className="space-y-3">
            <ChatHeader
                onlineUsers={onlineUsers}
            />

            <MessageList
                messages={
                    search.trim()
                        ? searchResults
                        : messages
                }

                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}

                user={user}
                loadingMore={loadingMore}
                loadOlder={loadOlder}
                bottomRef={bottomRef}
                handleReaction={handleReaction}
                setReplyingTo={setReplyingTo}
                handleEditMessage={handleEditMessage}
                deleteForMe={handleDeleteForMe}
                deleteForEveryone={handleDeleteForEveryone}
            />

            {!hasMore && (
                <div className="text-center text-gray-400">

                    Beginning of conversation

                </div>
            )}

            <TypingIndicator
                typingUser={typingUser}
            />

            <ReplyPreview
                replyingTo={replyingTo}
                clearReply={() => setReplyingTo(null)}
            />

            <ChatInput
                text={text}
                setText={setText}
                send={send}
                sending={sending}
                socket={socket}
                clubId={clubId}
                user={user}
            />
        </div>
    );
}