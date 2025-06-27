import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const [whisper, setWhisper] = useState('');

  // useEffect(() => {
  //   const hasReloaded = sessionStorage.getItem('hasReloadedProfile');
  //   if (!hasReloaded) {
  //     sessionStorage.setItem('hasReloadedProfile', 'true');
  //     window.location.reload();
  //   }
  // }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen mt-10 pt-20 bg-[#2323239a] text-rose-200">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="bg-gradient-to-br from-[#1c1c1e87] to-[#0F0F0F] shadow-[0_0_60px_red] rounded-xl p-8 space-y-8 flex flex-col md:flex-row gap-8">

          {/* LEFT SIDE: Avatar */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:w-1/3">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-mono text-rose-500 drop-shadow-[0_0_5px_#ff0044]">
                <span className='italic'>Welcome, </span><span className='font-mono'>Dreamer!</span>
              </h1>
              <p className="text-md text-gray-400 font-mono">
                Your whispers shape the world. Here’s your personal space.
              </p>
            </div>

            {/* Avatar Upload */}
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-rose-900 shadow-[0_0_14px_#ff3366]"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-rose-700 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 shadow-lg shadow-rose-500/50 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-rose-100" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400 italic text-center md:text-left">
              {isUpdatingProfile ? "Whispering to the servers..." : "Click the camera to change your vibe pic."}
            </p>

            {/* Whisper Input*/}
            {/* Only visible to the user (like a private mood box). */}
            <div className="w-full">
              <label htmlFor="whisper" className="block text-sm text-gray-500 mb-1 font-mono">
                Your Whisper for Today
              </label>
              <textarea
                id="whisper"
                rows="3"
                placeholder="Type your secret whisper here..."
                className="w-full p-2 rounded-lg bg-[#1A1A1D] border border-rose-800 text-rose-300 placeholder:text-gray-600 shadow-inner shadow-rose-950 focus:outline-none focus:ring-1 focus:ring-rose-600 resize-none"
                value={whisper}
                onChange={(e) => setWhisper(e.target.value)}
              />
              <p className="text-sm text-rose-800 mt-1 italic text-center md:text-left">Only you can see this vibe whisper</p>
            </div>
          </div>

          {/* RIGHT SIDE: User Info + Account Info */}
          <div className="flex-1 space-y-8">
            {/* User Info */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-400" />
                  <h4 className='pl-1.5 text-rose-700 font-mono text-lg'>Whisper Name</h4>
                </div>
                <p className="px-4 py-2.5 bg-[#1A1A1D] rounded-lg border-b-2 border-rose-950 text-green-500">
                  {authUser?.fullname
                  ?.split(' ')
                  .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
                  .join(' ')}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <h4 className='pl-1.5 text-rose-700 font-mono text-lg'>Contact Echo</h4>
                </div>
                <p className="px-4 py-2.5 bg-[#1A1A1D] rounded-lg border-b-2 border-rose-950 text-green-400">
                  {authUser?.email}
                </p>
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-6 bg-[#121212] rounded-xl p-6 border border-rose-950 shadow-xl shadow-red-950">
              <h2 className="text-lg font-semibold text-rose-400 mb-4">Account Vibes</h2>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span>Joined The Whisprverse</span>
                  <span className="text-rose-300">{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Status</span>
                  <span className="text-green-400">Echoing 🌿</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-rose-700 pt-4">
              "Let your whispers become waves in the silence."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
