
import express from 'express';
import path from 'path';
// import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { app } from './lib/socket.js';
import connectDB from './lib/db.server.js';
import { server } from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Setup
dotenv.config({ path: './.env' });
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Path handling for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);

// Production static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'dist','index.html'));
  });
}

// Start server
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
