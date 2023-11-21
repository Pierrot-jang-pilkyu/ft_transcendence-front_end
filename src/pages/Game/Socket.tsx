import { io } from "socket.io-client";

const socket = io("localhost:3131/games", {
    autoConnect: false
});

export default socket;