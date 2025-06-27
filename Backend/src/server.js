import dotenv from 'dotenv'

import express from 'express';
import path from 'path'

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app } from './lib/socket.js';

//  Apply all middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

dotenv.config({ path: './.env' })
// dotenv.config();

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.use("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
        // res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    })
}

// Import and register routes directly
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


import { server } from './lib/socket.js'; // from socket io is now "main"
import connectDB from './lib/db.server.js'
// console.log("MongoDB URI:", process.env.MONGODB_URI);

connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log('Error in DB listening connection', error)
        throw error
    })
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log('MongoDB connection failed', err)
});
