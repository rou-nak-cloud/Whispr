import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
       fontSize: 'Medium', 
        setFontSize: (size) => set({ fontSize: size }),

        bubbleStyle: 'Rounded',
        setBubbleStyle: (style) => set({ bubbleStyle: style }),
}))