import { io } from "socket.io-client";

export const socket = io("localhost:3131/games", {
    autoConnect: false
});

export enum Status {
	Loading,
	Setting,
	Gaming,
}

export const room = {};