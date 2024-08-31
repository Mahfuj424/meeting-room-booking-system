/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        primary: '#1586FD', // Your custom primary color
        secondary: '#4B5563', // gray-600 as secondary color
        darkBg: '#0F172A', // gray-900 as dark background color
        darkCard:'#1E293B'
      },
    },
  },
  plugins: [],
};
