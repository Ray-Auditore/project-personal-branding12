/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        typewriter: ['"Special Elite"', 'monospace'],
        terminal: ['"VT323"', 'monospace'],
        courier: ['"Courier Prime"', 'monospace'],
      },
      colors: {
        paper: '#e8e4d8',
        ink: '#1a1a1a',
        aged: '#c9c2af',
        file: '#d9d2bf',
      },
      boxShadow: {
        stamp: '2px 2px 0 0 #1a1a1a',
        'hard': '6px 6px 0 0 #1a1a1a',
        'hard-sm': '3px 3px 0 0 #1a1a1a',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.85' },
          '50%': { opacity: '0.6' },
          '55%': { opacity: '0.9' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        stampIn: {
          '0%': { transform: 'rotate(-18deg) scale(2.4)', opacity: '0' },
          '60%': { transform: 'rotate(-14deg) scale(1.1)', opacity: '1' },
          '100%': { transform: 'rotate(-12deg) scale(1)', opacity: '1' },
        },
        typeIn: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        flicker: 'flicker 3s infinite',
        scan: 'scan 6s linear infinite',
        stampIn: 'stampIn 0.5s ease-out forwards',
        typeIn: 'typeIn 1.8s steps(40) forwards',
      },
    },
  },
  plugins: [],
};
