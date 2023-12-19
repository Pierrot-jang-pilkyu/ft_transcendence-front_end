import io from 'socket.io-client';

const socket = io('localhost:3131/chats', {
    autoConnect: false,
    withCredentials: true,
});

export default socket;
