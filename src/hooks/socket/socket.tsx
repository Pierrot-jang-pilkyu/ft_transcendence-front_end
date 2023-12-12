import { io } from "socket.io-client";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const socket = io("localhost:3131/lobby", {
  autoConnect: false,
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${cookies.get("TwoFactorAuth")}`,
      },
    },
  },
});
console.log(cookies.get("TwoFactorAuth"));

export default socket;
