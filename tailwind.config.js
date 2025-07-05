/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-green-100",
    "text-green-800",
    "bg-red-100",
    "text-red-800",
    "bg-yellow-100",
    "text-yellow-800",
    "ring-green-400",
    "ring-red-400",
    "ring-yellow-400",
    "ring-gray-400",
  ],
}

