import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data.users })  // as users is an array
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async(userId) => {
          if (!userId) {
        console.log("User ID is missing");
        return;
    }
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.messages })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessageLoading: false });
        }
    },
    sendMessages: async(messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data.newMessage] })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // todo: optimize the selected user
    setSelectedUser: (selectedUser) => set({ selectedUser }),


}))