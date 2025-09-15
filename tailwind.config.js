/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#FF00D9',
        dark: '#0A0E27',
        'dark-bg': '#0A0E27',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}