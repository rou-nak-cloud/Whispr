import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utills.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async (req,res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        if( password.length < 6){
            return res.status(400).json({ message: "Passwords must be at least 6 characters long" })
        }
        const user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ message: "User already existed" })
        }

        // Salting Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        // Creating User
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        })

        if(newUser){
            // generating JWT token
            generateToken(newUser._id, res)
            await newUser.save();

            return res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profilePic: newUser.profilePic
                }
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "User not found" })
        }
        // Checking password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Unauthorized Access" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            message: "User Logged in successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic
            }
        })
    } catch (error) {
        console.log("Error in login controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        console.log("Error in Log out", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile  = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        if(!uploadResponse) {
            return res.status(500).json({ message: "Failed to upload profile picture" });
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true },
        )
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("Error in update profile ", error.message)
        res.status(500).json({ meesage: "Internal server error" })
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}