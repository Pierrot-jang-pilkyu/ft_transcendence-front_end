import { io } from "socket.io-client";

// const socket = io("localhost:3131/lobby", {
//   autoConnect: false,
// });

const socket = io("localhost:3131/lobby");

export default socket;
