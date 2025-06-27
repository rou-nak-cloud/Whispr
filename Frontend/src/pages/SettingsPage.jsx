import React from 'react';
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const FONT_SIZES = ['Small', 'Medium', 'Large'];
const BUBBLE_STYLES = ['Rounded', 'Square'];

const SettingsPage = () => {
  const { theme, setTheme, fontSize, setFontSize, bubbleStyle, setBubbleStyle } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 mt-3 max-w-7xl">
      {/* Grid Layout for Left (Settings) and Right (Preview) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT SIDE: SETTINGS */}
        <div className="space-y-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-rose-700">Personalize Your Experience</h2>
            <p className="text-sm text-base-content/70">
              Select a theme that matches your vibe. Your chat, your style — light, dark, or colorful!
            </p>
          </div>

          {/* Theme Selector */}
          <div>
            <h3 className="text-lg font-mono text-rose-500 mb-2">Theme</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Selector */}
          <div className='flex items-center justify-around'>
          <div>
            <h3 className="text-lg font-mono text-rose-500 mb-2">Font Size</h3>
            <p className="text-sm text-base-content/70 mb-2">Adjust the font size of messages.</p>
            <div className="flex gap-2">
              {FONT_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`btn btn-outline btn-sm ${fontSize === size ? 'btn-primary' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bubble Style Selector */}
          <div>
            <h3 className="text-lg font-mono text-rose-500 mb-2">Bubble Style</h3>
            <p className="text-sm text-base-content/70 mb-2">Change the shape of message bubbles.</p>
            <div className="flex gap-2">
              {BUBBLE_STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setBubbleStyle(style)}
                  className={`btn btn-outline btn-sm ${bubbleStyle === style ? 'btn-primary' : ''}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* RIGHT SIDE: PREVIEW */}
        <div>
          <h3 className="text-xl font-bold text-rose-800 mb-3">Live Preview</h3>
          <p className="text-sm text-base-content/70 mb-4">See how your selections affect the chat UI below:</p>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">

                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">PM</div>
                    <div>
                      <h3 className="font-medium text-sm">PM Narendra@Modi</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 shadow-sm
                          ${bubbleStyle === 'Rounded' ? 'rounded-xl' : 'rounded-none'}
                          ${message.isSent ? 'bg-primary text-primary-content' : 'bg-base-200'}
                          ${fontSize === 'Small' ? 'text-sm' : fontSize === 'Large' ? 'text-lg' : 'text-md'}
                        `}
                      >
                        <p>{message.content}</p>
                        <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingsPage;
