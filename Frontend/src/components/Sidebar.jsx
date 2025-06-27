import React, { useEffect } from 'react';
import { useChatStore } from "../store/UseChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers();
  }, [getUsers]);

    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  const capitalizeName = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <aside className="
      h-screen w-20 sm:w-24 md:w-28 lg:w-72 bg-base-100 shadow-xl rounded-r-3xl 
      flex flex-col border-r border-base-300 overflow-hidden transition-all duration-300
    ">
      {/* Header */}
      <div className="
        flex items-center gap-3 p-4 bg-gradient-to-r from-rose-600 via-pink-300 to-indigo-600 
        shadow-inner rounded-b-3xl
      ">
        <Users className="size-6 text-white" />
        <span className="hidden lg:block font-semibold text-white text-lg">Contacts</span>
      </div>
        <div className='onlineUsers'>
      {/* todo: online users */}
        <div className="mt-3 mb-1 hidden lg:flex flex-col justify-center px-4">
        <label
          className="cursor-pointer flex items-center gap-3 px-3 py-2 bg-rose-900/60 rounded-xl shadow-inner hover:shadow-sm shadow-rose-900 transition-all duration-200"
        >
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm checkbox-error rounded-full"
          />
          <span className="text-sm font-semibold text-orange-300/60">
            Online People
          </span>
          <span className="text-xs text-emerald-400/90  font-mono">
           {onlineUsers.length -1 } online
          </span>
        </label>
      </div>
     </div> 

      {/* User List */}
      <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full flex items-center gap-3 p-2 rounded-xl transition-all
              ${selectedUser?._id === user._id
                ? "bg-rose-100 shadow-lg ring-2 ring-rose-300 scale-[1.02]"
                : "hover:bg-rose-50 hover:shadow-md"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 md:size-12 object-cover rounded-full border-2 border-white shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* Info - show only on medium and above screens */}
            <div className="hidden lg:flex flex-col text-left min-w-0">
              <div className="font-semibold text-zinc-600 truncate font-mono">
                {capitalizeName(user.fullname)}
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className='text-center font-mono text-xl text-red-800/90 py-4'>
            No one Online to whispr...
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
