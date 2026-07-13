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
import useMessageSearch from "./hooks/useMessageSearch";
import { uploadChatFile } from "../../../services/chatService";
import DropZone from "./components/DropZone";
import MediaSidebar from "./MediaSidebar";
import { markRoomRead } from "../../../services/chatService";

import { Pin } from "lucide-react";
import PinnedMessagesDrawer from "./PinnedMessagesDrawer";
import { getPinnedMessages } from "../../../services/chatService";

export default function ClubChat({
    clubId,
    token,
    user
}) {
    const socket = getSocket();

    useClubChat(clubId, token);

    const {
        search,
        setSearch,
        searchResults,
        handleSearch
    } = useMessageSearch(clubId);

    const bottomRef = useRef(null);

    const messageRefs = useRef({});

    const [messages, setMessages] = useState([]);

    const [firstUnread,setFirstUnread]=useState(null);

    const [text, setText] = useState("");

    const [typingUser, setTypingUser] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [sending, setSending] = useState(false);

    const [loadingMore, setLoadingMore] = useState(false);

    const [hasMore, setHasMore] = useState(true);

    const [replyingTo, setReplyingTo] = useState(null);

    const [showPins, setShowPins] = useState(false);

    const [pins, setPins] = useState([]);

    const [highlightedMessage, setHighlightedMessage] = useState(null);

    const [attachments, setAttachments] = useState([]);

    const [dragging,setDragging]=useState(false);

    const [showMedia,setShowMedia]=useState(false);

    useEffect(() => {
        if (!socket || !clubId) return;

        const loadMessages = async () => {
            try {
                const res = await getClubMessages(clubId);

                setMessages(res.data);

                const unread=res.data.find(
                    message=>
                        !message.readAt &&
                        message.membership.user.id!==user.id
                );

                if(unread){
                    setFirstUnread(unread.id);
                }

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

        socket.on(
            "message-read",
            data=>{
                setMessages(prev=>
                    prev.map(message=>
                        message.id===data.messageId
                            ?{
                                ...message,
                                reads:data.reads,
                                readCount:data.reads.length,
                                delivered:data.reads.length>0
                            }
                            :message
                    )
                );
            }
        );

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
            behavior:"smooth"
        });

        if(messages.length===0) return;

        const lastMessage=messages[messages.length-1];

        if(
            lastMessage.membership.user.id!==user.id
        ){
            markMessageRead(
                lastMessage.id
            ).catch(console.error);
        }
    },[
        messages,
        clubId,
        user.id
    ]);

    const send = async ({ text, attachments }) => {
        if (!text.trim() && attachments.length === 0) {
            return;
        }

        setSending(true);

        try {
            const uploadedFiles=[];

            for(const item of attachments){
                const res=await uploadChatFile(
                    item.file,
                    percent=>{
                        setAttachments(prev=>
                            prev.map(file=>
                                file.id===item.id
                                ?{
                                    ...file,
                                    progress:percent,
                                    status:"uploading"
                                }
                                :file
                            )
                        );
                    }
                );

                setAttachments(prev=>
                    prev.map(file=>
                        file.id===item.id
                        ?{
                            ...file,
                            progress:100,
                            status:"uploaded"
                        }
                        :file
                    )
                );

                uploadedFiles.push(res);

            }

            socket.emit("send-message", {
                roomId: clubId,
                content: text,
                attachments: uploadedFiles,
                replyToId: replyingTo?.id || null
            });

            setText("");

            setTimeout(()=>{
                setAttachments([]);
            },400);

            setReplyingTo(null);
        }

        catch (err) {
            console.error(err);
        }

        finally {
            setSending(false);
        }
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

    const loadPins = async () => {
        try{
            const data = await getPinnedMessages(clubId);
            setPins(data.pins);
        }

        catch(err){
            console.error(err);
        }
    };

    const openPins = async () => {
        await loadPins();
        setShowPins(true);
    };

    const jumpToMessage = (messageId) => {

        const node = messageRefs.current[messageId];

        if (!node) return;

        node.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        setHighlightedMessage(messageId);

        setShowPins(false);

        setTimeout(() => {
            setHighlightedMessage(null);
        }, 2500);
    };

    const onDragEnter=(e)=>{
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave=(e)=>{
        e.preventDefault();
        setDragging(false);
    };

    const onDragOver=(e)=>{
        e.preventDefault();
    };

    const onDrop=(e)=>{
        e.preventDefault();
        setDragging(false);

        const files=[...e.dataTransfer.files];

        if(files.length===0) return;

        const formatted=files.map(file=>({
            id:crypto.randomUUID(),
            file,
            progress:0,
            status:"waiting",
            preview:file.type.startsWith("image/")
                ?URL.createObjectURL(file)
                :null
        }));

        setAttachments(prev=>
            [...prev,...formatted]
        );
    };

    return (
        <div className="space-y-3">
            <DropZone

                dragging={dragging}

                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}

            >

                <ChatHeader
                    clubName="Club Chat"
                    onlineUsers={onlineUsers}
                    onOpenPins={openPins}
                >
                    <button
                        onClick={() => setShowMedia(v => !v)}
                    >
                        🖼
                    </button>
                </ChatHeader>

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
                    firstUnread={firstUnread}
                    messageRefs={messageRefs}
                    highlightedMessage={highlightedMessage}
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

                    attachments={attachments}
                    setAttachments={setAttachments}

                    send={send}
                    sending={sending}

                    socket={socket}
                    clubId={clubId}
                    user={user}
                />

                <MediaSidebar
                    open={showMedia}
                    roomId={clubId}
                />
            </DropZone>
        </div>
    );
}