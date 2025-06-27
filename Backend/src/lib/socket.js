
import { Server } from 'socket.io';
import http from 'http';
import express from 'express'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
});
    // for handle messages real time
    export function getReceiverSocketId(userId) {
      return  userSocketMap[userId]
    }

    // used to store the online users
    const userSocketMap = {}; // {userId: socketId}

    io.on('connection', (socket) => {
    console.log(' User connected:', socket.id);

    const userId = socket.handshake.query.userId;
    // if(userId) {
    //     userSocketMap[userId] = socket.id;
    // }

      // Prevent adding 'undefined' as a user
  if (!userId || userId === "undefined") {
    console.warn(" Invalid userId, skipping socket registration:", userId);
    return;
  }
  userSocketMap[userId] = socket.id;
//   socket.userId = userId;

// io.emit() => is user to send events mainly who are online or offline to the connected clients
    io.emit("onlineOrOfflineUsers", Object.keys(userSocketMap));


    socket.on('disconnect', () => {
        // const userId = socket.userId;
        console.log(' User disconnected:', socket.id);
        delete userSocketMap[userId];
        io.emit("onlineOrOfflineUsers", Object.keys(userSocketMap));
    });
    });

export { app, io, server };
