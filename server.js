require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT;

const rooms = new Map();

app.use(cors());
app.use(express.json());

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }

  res.send();
});

io.on('connection', socket => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    io.to(roomId).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(obj);
    io.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
      }
    });
  });
});

server.listen(PORT, error => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Server works at port ${PORT}`);
});
