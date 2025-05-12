const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send_message', (payload, callback) => {
    console.log('Received send_message:', payload);
    const { senderId, receiverId, message, path } = payload;

    if (!senderId || !receiverId || !message || !path) {
      console.error('Invalid payload:', payload);
      callback({ success: false, error: 'Missing required fields' });
      return;
    }

    // Simulate message delivery to the receiver
    console.log(`Message from Node ${senderId} to Node ${receiverId}:`, { message, path });
    socket.emit('receive_message', { nodeId: receiverId, message });

    callback({ success: true });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});