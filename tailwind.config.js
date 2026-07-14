/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          glow: '#FFD700'
        },
        dark: {
          900: '#090A0F',
          800: '#12141D',
          700: '#1A1D2B',
          600: '#262A3E'
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
