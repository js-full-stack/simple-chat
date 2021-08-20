import io from 'socket.io-client';
const socketOptions = {
  cors: {
    origin: '*',
    credentials: true,
  },

  transports: ['websocket'],
};

const socket = io('http://localhost:8889/', socketOptions);
export default socket;
