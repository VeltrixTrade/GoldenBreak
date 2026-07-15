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
          400: '#FFEB3B', // Logo bright yellow
          500: '#FFE300', // Logo primary yellow
          600: '#E5CB00', // Logo darker yellow
          700: '#B8A300',
          800: '#8A7A00',
          900: '#5C5200',
          950: '#2E2900'
        },
        gold: {
          400: '#FFEB3B',
          500: '#FFE300',
          600: '#E5CB00',
          glow: '#FFE300'
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
