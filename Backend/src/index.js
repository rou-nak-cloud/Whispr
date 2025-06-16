import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // for form data

app.use(cookieParser());
app.use(cors({
    origin: " http://localhost:5173",
    credentials: true,
}))

// importing routes
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'



// route declaration
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

export default app;