import React, { useEffect } from 'react';
import { useChatStore } from "../store/UseChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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

      {/* User List */}
      <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
        {users.map((user) => (
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
      </div>
    </aside>
  );
};

export default Sidebar;
