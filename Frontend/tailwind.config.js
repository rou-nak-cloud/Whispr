  import daisyui from 'daisyui'
import { base } from 'daisyui/imports';
  import themes from 'daisyui/theme/object'
  /** @type {import('tailwindcss').Config} */

 export default {
   content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
      //   colors: {
      //   // Custom Background
      //   'whispr-black': '#0A0A0A',
        
      //   // Accent Colors
      //   'whispr-mint': '#00FFC6',   // Bright mint for main headings or highlights
      //   'whispr-rose': '#FF4D67',   // Rose-pink for buttons / main CTA
      //   'whispr-orange': '#FFB86C', // Warm accent (icons, small details)
      //   'whispr-teal': '#64FFDA',   // Soft teal for links, hover states
      //   'whispr-emerald': '#50FA7B', // Emerald green for labels / success

      //   // Text Colors
      //   'whispr-gray': '#A0A0A0',   // Soft gray for subtext / body
      //   'whispr-darkgray': '#555555', // Darker gray for disabled text
      // },
      },
    },
    plugins: [daisyui],
    daisyui: {
      // 32 different themes:
      themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    base: true,
    },
  };