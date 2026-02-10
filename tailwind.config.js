/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#14532d',
        },
        slate: {
          850: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        // Slowed down significantly (240s) so each card stays readable
        'scroll': 'scroll 240s linear infinite', 
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Moves half the duplicated list
        }
      }
    },
  },
  plugins: [],
}