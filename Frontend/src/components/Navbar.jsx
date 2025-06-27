import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { AudioWaveform, LogOut, MessageSquare, Settings, Slack, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header
       className="shadow-lg shadow-[#000000] fixed w-full top-0 z-40 
    backdrop-blur-lg bg-[#0B0C10]"
    >
      <div className="container mx-auto px-0.5 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all">
              <div className="size-12 rounded-lg flex items-center justify-center">
                <AudioWaveform className="w-9 h-9 text-rose-800" />
              </div>
              <h1 className="text-4xl text-rose-600 font-light">Shhh!</h1>
            </Link>
          </div>

        {/* RIGHT */}
        {/* <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div> */}

          {/* RIGHT */}
            <div className="flex items-center gap-3">

              <Link
                to={"/settings"}
                className="flex items-center group relative overflow-hidden gap-2 px-3 py-1.5 rounded-md border-rose-400 text-rose-400 hover:bg-rose-600/20 hover:shadow-[#0000] transition-all duration-300"
              >
                <Settings className="size-5 text-rose-500 transform transition-transform duration-300 group-hover:translate-x-4" />
                <span className="hidden sm:inline text-rose-400 transition-opacity duration-300 group-hover:opacity-0">Themes</span>
              </Link>

              {authUser && (
                <>
                  <Link
                    to={"/profile"}
                    onClick={() => {
                      if(window.location.pathname !== "/profile") {
                        // When navigating from another page, do a full reload
                         window.location.href = "/profile";
                      }
                    }}    
                    className="flex items-center group relative overflow-hidden gap-2 px-3 py-1.5 rounded-md border-rose-400 text-rose-400 hover:bg-rose-600/20 hover:shadow-[#0000] transition-all duration-300"
                  >
                    <User className="size-5 text-rose-500 transform transition-transform duration-300 group-hover:translate-x-4" />
                    <span className="hidden sm:inline text-rose-400 transition-opacity duration-300 group-hover:opacity-0">Profile</span>
                  </Link>

                  <button
                    className="flex gap-2 items-center group relative overflow-hidden px-3 py-1.5 text-rose-400 hover:bg-rose-950 hover:text-red-600 cursor-pointer hover:shadow-[#0000] rounded-md transition-all duration-300"
                    onClick={logout}
                  >
                    {/* Icon that moves on hover */}
                    <LogOut className="size-5 text-rose-500 transform transition-transform duration-300 group-hover:translate-x-4" />
                    
                    {/* Text that fades out on hover */}
                    <span className="hidden sm:inline text-rose-400 transition-opacity duration-300 group-hover:opacity-0">
                      Logout
                    </span>
                  </button>
                </>
              )}
            </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
