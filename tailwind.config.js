/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
    "!./node_modules",
    "./app/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  jit: true,
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"]
      },
      colors: {
        "gray-900": "#121214",
        "gray-800": "#202024",
        "gray-700": "#27272b",
        "gray-500": "#8d8d99",
        "gray-300": "#c4c4cc",
        "gray-100": "#e1e1e6",
        white: "#fff",
  
        "green-500": "#00875f",
        "green-300": "#00b37e"
      }
    },
  },

  variants: {
    extends: {
      scrollbar: ["dark"]
    }
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
