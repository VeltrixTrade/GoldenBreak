/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f2ae3d', // Light gold/orange
          500: '#e09824', // Qzone primary gold
          600: '#bd7c17', // Darker gold
          700: '#96600d',
          800: '#754a0a',
          900: '#543405',
          950: '#2e1c01'
        },
        gold: {
          400: '#f2ae3d',
          500: '#e09824',
          600: '#bd7c17',
          glow: '#e09824'
        },
        dark: {
          900: '#080b0e', // Qzone dark body bg
          800: '#101418', // Qzone secondary bg
          700: '#13181c', // Qzone custom bg card
          600: '#1c2227'
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
