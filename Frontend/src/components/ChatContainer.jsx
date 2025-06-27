import React from 'react'
import { useChatStore } from "../store/UseChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from "../lib/utils";


const ChatContainer = () => {
    const {messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
     const { authUser } = useAuthStore();
     const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser._id)

        subscribeToMessages();
        return () => unsubscribeFromMessages();
    },[selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages])

    useEffect(() => {
      if(messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, [messages])

    if(isMessageLoading){
          return (
            <div className='flex-1 flex-col flex overflow-auto'>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }
    // console.log("messages in ChatContainer:", messages);
      
    const capitalizeName = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };


  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader />

    <div className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0 custom-scrollbar'>
    {Array.isArray(messages) && messages.map((message, index) => {
      const isLastMessage = index === messages.length - 1;
      return (
    <div
      key={message._id}
      ref={isLastMessage ? messageEndRef : null} //  Only last message
      className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border-2 border-emerald-400 shadow-md">
          <img
            src={
              message.senderId === authUser._id
                ? authUser.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
            alt="profile pic"
            className="object-cover rounded-full"
          />
        </div>
      </div>

      <div className="chat-header mb-1 flex items-center space-x-2">
        <span className="text-xs font-medium text-gray-600">
          {message.senderId === authUser._id ? "You" : capitalizeName(selectedUser.fullname)}
        </span>
        <time className="text-xs text-gray-400">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      <div
        className={`chat-bubble flex flex-col p-3 rounded-2xl max-w-xs sm:max-w-sm md:max-w-md shadow-md ${
          message.senderId === authUser._id
            ? "bg-gradient-to-br from-emerald-900 to-green-950 text-white"
            : "bg-gradient-to-br from-teal-700 to-teal-900 text-white"
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="rounded-lg mb-2 max-h-60 object-cover border-none border-white shadow-sm"
          />
        )}
        {message.text && (
          <p className="whitespace-pre-wrap break-words leading-relaxed tracking-wide">
            {message.text}
          </p>
        )}
      </div>
    </div>
      )
  })}
 </div> 

      <MessageInput />

    </div>
  )
}

export default ChatContainer
