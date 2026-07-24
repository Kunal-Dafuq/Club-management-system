import { useEffect } from "react";
import { initSocket, getSocket } from "../socket/socket";

export default function useClubChat(clubId, token) {

    useEffect(() => {

        let socket = getSocket();

        if (!socket) {
            socket = initSocket(token);
        }

        socket.emit("join-room", clubId);

        return () => {
            socket.emit("leave-room", clubId);
        };

    }, [clubId, token]);

}