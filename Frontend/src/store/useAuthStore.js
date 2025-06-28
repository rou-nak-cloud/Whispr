import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

import { io } from 'socket.io-client'

const BASE_URL =  import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create ((set, get) => ({
    authUser: null, // fresh person so everything is false
    isLoggingIn: false,
    isSigningUp: false, // for loading animation
    isUpdatingProfile: false, // loading state for updating image on cloudinary through mongoDb
    
    isCheckingAuth: true, // check every time while the page refresh
    // in backend checkAuth function have to run so to understand the user is authenticated or not??

    onlineUsers: [], // with socket
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            // checking auth for user authentication is he log in or not? thats mean we have to run socketIO
             get().connectSocket();
            //  setTimeout(() => {
            // get().connectSocket(); // Now reads the updated authUser
            // }, 0);
        } catch (error) {
            console.log("Error in authentication", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    // Backend server for signup
    signUp: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data });
            toast.success("Account created successfully")
            // socketIO
               setTimeout(() => {
            get().connectSocket(); // Now reads the updated authUser
            }, 0);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup", error)
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
           const res = await axiosInstance.post("/auth/login", data, {
                withCredentials: true
                })
            set({ authUser: res.data});
            toast.success("Logged in successfully")
            // SOCKETio
            get().connectSocket();
        //    setTimeout(() => {
        //     get().connectSocket(); // Now reads the updated authUser
        //     }, 0);

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in login", error)
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
       try {
         await axiosInstance.post("/auth/logout");
         set({ authUser: null })
         toast.success("Logged out successfully")
        //  disconnect of Socket
        get().disconnectSocket();
       } catch (error) {
        toast.error(error.response.data.message)
       }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
        const res = await axiosInstance.put("/auth/updateProfile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
        } catch (error) {
        console.log("error in update profile:", error);
        toast.error(error.response.data.message);
        } finally {
        set({ isUpdatingProfile: false });
        }
    },

    // connect of Socket
    connectSocket: () => {
        const { authUser } = get()
        const userId = authUser?.user?._id;
        console.log({ userId })

          // Debug log
        //   console.log("connectSocket called with authUser:", get().authUser);
        //  console.log("Connecting socket with user:", authUser._id);
         
        if (!userId || get().socket?.connected) {
            console.warn(" Skipping socket connection - userId missing or already connected.");
            return;
            }

        // const userId = socket.handshake.query.userId;   => from socket
        const socket = io(BASE_URL, {
            query: {
                // userId: authUser._id,
                  userId: userId,
            }
        })
        socket.connect();
        set({ socket: socket });

        socket.on("onlineOrOfflineUsers", (userIds) => {
            // console.log("Received online users:", userIds);
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected)  get().socket.disconnect()
    },

})) 