import React from 'react'
import { useChatStore } from '../store/UseChatStore';
// import { Sidebar } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';


const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-full bg-base-200">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-center px-4">
        <div className="bg-base-100 w-full mt-12 h-[88vh] rounded-lg shadow-lg shadow-black flex overflow-hidden">
          <Sidebar />
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  )
}

export default HomePage
