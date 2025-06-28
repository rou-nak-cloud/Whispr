// import React, { useRef, useState } from 'react'
// import { useChatStore } from '../store/UseChatStore'
// import { Image, Send, X } from 'lucide-react'


// const MessageInput = () => {
//     const [text, setText] = useState("")
//     const [imagePreview, setImagePreview] = useState(null)
//     const fileInputRef = useRef(null)
//     const { sendMessages } = useChatStore()

//     const handleImageChange = (e) => {
//             const file = e.target.files[0];
//             if (!file.type.startsWith("image/")) {
//             toast.error("Please select an image file");
//             return;
//             }

//             const reader = new FileReader();
//             reader.onloadend = () => {
//             setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//          };

//     const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     };

//     const handleSendMessage = async(e) => {
//          e.preventDefault();
//     if (!text.trim() && !imagePreview) return;

//     try {
//       await sendMessages({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       // Clear form
//       setText("");
//       setImagePreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//     };
    
    
//    return (
//     <div className="p-2 w-full bg-gradient-to-r from-rose-700  to-indigo-950 rounded-b-2xl shadow-inner">
//       {/* Image Preview Section */}
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-24 h-24 object-cover rounded-xl border border-zinc-300 shadow-md"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition"
//               type="button"
//             >
//               <X className='size-3' />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Message Input Section */}
//       <form 
//       onSubmit={handleSendMessage}
//       className="flex items-center gap-3 ">
//         <div className="flex-1 flex gap-2 bg-rose-950/60 rounded-full shadow-md px-4 py-2 pl-10 transition focus-within:ring-2 focus-within:ring-rose-700">
//           <input
//             type="text"
//             className="flex-1 outline-none bg-transparent text-3xl text-red-200 font-mono sm:text-base placeholder-red-400"
//             placeholder="Type something awesome..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//           />

//           <button
//             type="button"
//             className={`hidden sm:flex btn btn-circle border-none
//             ${imagePreview ? "text-emerald-500" : "text-zinc-300"}`}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Image size={20} />
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-lg btn-circle bg-rose-500 hover:bg-rose-900 border-none text-white shadow-md shadow-rose-600"
//           disabled={!text.trim() && !imagePreview}
//         >
//           <Send size={22} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput


import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/UseChatStore'
import { Image, Send, X } from 'lucide-react'

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const { sendMessages } = useChatStore()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2 w-full bg-gradient-to-r from-rose-700 to-indigo-950 rounded-b-2xl shadow-inner">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-zinc-300 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Section */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap"
      >
        <div className="flex-1 flex gap-2 bg-rose-950/60 rounded-full shadow-md px-4 py-2 pl-5 transition focus-within:ring-2 focus-within:ring-rose-700">
          <input
            type="text"
            className="flex-1 outline-none bg-transparent text-md text-red-200 font-mono sm:text-base placeholder-red-400"
            placeholder="Type something awesome..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle border-none
            ${imagePreview ? "text-emerald-500" : "text-zinc-300"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm sm:btn-lg btn-circle bg-rose-500 hover:bg-rose-900 border-none text-white text-center shadow-md shadow-rose-600"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
