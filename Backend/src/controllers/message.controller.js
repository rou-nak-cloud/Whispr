import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

import mongoose from 'mongoose';

export const getUserForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password")
        // console.log("Filtered Users:", filteredUsers);
        // Exclude the logged-in user from the list and select all fields except password
        res.status(200).json({
            message: "Users fetched successfully",
            users: filteredUsers
        });
    } catch (error) {
        console.log("Error in getUserForSidebar controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId } = req.params; // Get the user ID from the request parameters
        const myId = req.user._id; // Get the logged-in user's ID from the request object

       const messages = await Message.find({
       $or: [
        { senderId: myId, receiverId: new mongoose.Types.ObjectId(userToChatId) },
        { senderId: new mongoose.Types.ObjectId(userToChatId), receiverId: myId }
            ]
        });

        res.status(200).json({
            message: "Messages fetched successfully",
            messages: messages
        })
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req,res) => {
    try {
        const { text,image } = req.body;
        const { id: receiverId } = req.params; // Get the receiver's user ID from the request parameters
        const senderId = req.user._id; // Get the logged-in user's ID from the request object

        let imageURL;
        if(image){
            // upload to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        } 
        // else {
        //    return res.status(401).json({ message: "No Image to upload" })
        // }

        const newMessage = new Message({
            text,
            image: imageURL,
            senderId: senderId,
            receiverId: receiverId,
            // messageId: new mongoose.Types.ObjectId() // generate a new ID for messageId
        })

       res.status(200).json({
        message: "Message sent successfully",
        newMessage: await newMessage.save()  // <- Use unique key 'newMessage'
        })

        // todo: SOCKET.IO
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage)
        }
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}