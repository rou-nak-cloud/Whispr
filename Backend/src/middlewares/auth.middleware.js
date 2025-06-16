import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "Unauthorized No token provided" });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET) // get the user Id from the token that is encoded as payload(userId) 
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password") // Find user by ID and exclude password from the result
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Attach user to the request object for further use in the route handlers
        next(); // Call next middleware or route handler

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}