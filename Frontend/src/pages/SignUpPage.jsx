import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

import { AudioWaveform, Eye, EyeClosed, EyeClosedIcon, EyeOff, Heading, Key, Loader2, LogIn, Mail, MessageSquare, MoveRight, Section, Slack, UserPen } from 'lucide-react'

import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'

import toast from 'react-hot-toast'

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const {signUp, isSigningUp} = useAuthStore(); // zustand does not return array!!!

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  } // To check all field are present

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if(success === true) signUp(formData);
  }
  
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* LEFT side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-[#0B0C10]'> 
      <div className='w-full max-w-md space-y-8'>
        {/* LOGO */}
        <div className='text-center mb-10'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl flex items-center justify-center transitions-colors ease-in-out'>
            <div className='flex items-center gap-5 text-5xl font-mono text-rose-600'>
              <AudioWaveform className='size-16 text-rose-600 text-shadow-md text-shadow-rose-900'/>
              <a href="/" className='text-shadow-md text-shadow-rose-900' >Whispr </a>
            </div>
            </div>
            <h1 className='text-2xl text-emerald-100 font-sans font-semibold mt-2'>Create Account</h1>
            <p className='text-[#555555] font-mono text-xl'>Not just chat. It's a <span className='text-[#ff062b9e]'>Whispr!</span></p>
          </div>
        </div>
        {/* Form */}
        <form action="#" onSubmit={handleSubmit} className='space-y-6'>
          {/* Fullname */}
          <div className='form-control gap-2'>
            <label htmlFor="label" className='flex items-center border-b-2 border-emerald-700 hover:border-emerald-500 focus:border-rose-400'>
              <h1 className='label-text font-mono text-xl text-[#A0A0A0] inline-block width-[125px] pl-4'>Full Name:</h1>
              <div className='relative input-neutral ml-6'>
                <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                  <UserPen className='size-6 text-orange-600' />
                </div>
                <input 
                type="text"
                // className={`input input-bordered flex items-center w-full pl-10`}
                className={`bg-transparent transition-colors ease-in-out outline-none text-rose-400 text-xl px-2 py-2 pl-15`}
                placeholder='Enter your name'
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
            </label>
          </div>
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

        <button type='submit' className='py-4 rounded-4xl text-xl font-extrabold leading-none tracking-wide cursor-pointer text-[#eb0303] font-mono  bg-[#53000d] hover:bg-[#75d59fa6] hover:text-rose-950 hover:tracking-widest transition-all duration-500 ease-in-out w-full' disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <Loader2  className='size-5 animate-spin'/>
              Whispr!!!!!
            </>
          ) : (
            "Create Content"
          )}
        </button>
        </form>

          <div className='text-center flex items-center justify-center'>
            <p className='text-emerald-600 text-md font-mono flex items-center gap-1'>
              Already have an account?{" "}
              <Link to="/login" className='flex items-center underline gap-1 text-rose-700 hover:text-rose-500 transition-colors duration-300'>
                Sign in
                <LogIn className="size-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>


      {/* RIGHT side */}
          <AuthImagePattern
        title="“Where Every Word Matters.”"
        subtitle="A quiet space for your loudest thoughts — connect deeply, share openly, and let your words find the ones who truly listen."
      />
    </div>
  )
}

export default SignUpPage
