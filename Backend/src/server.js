import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
// dotenv.config();

import connectDB from './lib/db.server.js'
import app from './index.js'
// console.log("MongoDB URI:", process.env.MONGODB_URI);
connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log('Error in DB listening connection', error)
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log('MongoDB connection failed', err)
});