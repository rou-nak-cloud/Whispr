import React from 'react'
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import AuthImagePattern2 from '../components/AuthImagePattern2';
import { Link } from "react-router-dom";
import { AudioWaveform, Eye, EyeClosedIcon, EyeOff, Key, Loader2, Lock, LogIn, LogOut, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  //     try {
  //   await login(formData); // assuming loginUser sets the authUser
  //   window.location.href = "/profile"; // Force full reload to profile page
  // } catch (error) {
  //   console.error("Login failed:", error);
  // }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left side */}
       <AuthImagePattern2
        title={"Can't wait to Chat!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
        >
       </AuthImagePattern2>
      {/* Right Side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-[#0B0C10]'> 
      <div className='w-full max-w-md space-y-8'>
        {/* LOGO */}
        <div className='text-center mb-10'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl flex items-center justify-center transitions-colors ease-in-out mb-5'>
            <div className='flex items-center gap-5 text-5xl font-mono text-rose-600'>
              <AudioWaveform className='size-16 text-rose-600 text-shadow-md text-shadow-rose-900'/>
              <a href="/" className='text-shadow-md text-shadow-rose-900' >Whispr </a>
            </div>
            </div>
            {/* <h1 className='text-2xl text-emerald-100 font-sans font-semibold mt-2'>Create Account</h1> */}
            <p className='text-[#555555] font-mono text-xl'>Not just chat. It's a <span className='text-[#ff062b9e]'>Whispr!</span></p>
          </div>
        </div>
        {/* Form */}
        <form action="#" onSubmit={handleSubmit} className='space-y-6'>
          {/* Email */}
          <div className='form-control gap-2'>
            <label htmlFor="label" className='flex items-center border-b-2 border-emerald-700 hover:border-emerald-500'>
              <h1 className='label-text font-mono text-xl text-[#A0A0A0] inline-block width-[125px] pl-10'>Email:</h1>
              <div className='relative input-neutral ml-6'>
                <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
                  <Mail className='size-6 text-orange-600' />
                </div>
                <input 
                type="text"
                // className={`input input-bordered flex items-center w-full pl-10`}
                className={`bg-transparent  transition-colors ease-in-out outline-none  text-rose-400 text-xl px-2 py-2 pl-18`}
                placeholder='Your @email.com'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </label>
          </div>
          {/* Password */}
           <div className='form-control gap-2 mb-18'>
            <label htmlFor="label" className='flex items-center border-b-2 border-emerald-700 hover:border-emerald-500'>
              <h1 className='label-text font-mono text-xl text-[#A0A0A0] inline-block width-[125px] pl-4'>Password:</h1>
              <div className='relative input-neutral ml-6'>
                <div className='absolute inset-y-0 left-1 flex items-center pointer-events-none'>
                  <Key className='size-6 text-orange-600' />
                </div>
                <input  
                type={showPassword ? "text" : "password"}
                // className={`input input-bordered flex items-center w-full pl-10`}
                className={`bg-transparent  transition-colors ease-in-out outline-none  text-rose-400 text-xl px-2 py-2 pl-16`}
                placeholder='**********'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosedIcon  className='size-5 text-rose-700'/>
                   ) : (
                    <Eye className='size-6 text-rose-700'/>
                  )}
                </button>
              </div>
            </label>
          </div>

        <button type='submit' className='py-4 rounded-4xl text-xl font-extrabold leading-none tracking-wide cursor-pointer text-[#eb0303] font-mono  bg-[#53000d] hover:bg-[#75d59fa6] hover:text-rose-950 hover:tracking-widest transition-all duration-500 ease-in-out w-full' disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
              <Loader2  className='size-2 animate-spin'/>
              <span className='text-xl py-2'>Whispr!!!!!!</span>
            </>
          ) : (
            "Sign in"
          )}
        </button>
        </form>

          <div className='text-center flex items-center justify-center'>
            <p className='text-emerald-600 text-md font-mono flex items-center gap-1'>
             Don&apos;t have an account?{" "}
              <Link to="/signup" className='flex items-center underline gap-1 text-rose-700 hover:text-rose-500 transition-colors duration-300'>
                Create Account
                <LogIn className="size-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
