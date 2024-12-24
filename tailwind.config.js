/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'scan-fast': 'scan 3s linear infinite',
        'scan-slow': 'scan 8s linear infinite',
        'extend-right': 'extend-right 2s ease-out forwards',
        'extend-left': 'extend-left 2s ease-out forwards',
        'extend-up': 'extend-up 2s ease-out forwards',
        'extend-down': 'extend-down 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        wave: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '0.5' },
          '100%': { transform: 'scale(0.95)', opacity: '0.8' },
        },
        'extend-right': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' }
        },
        'extend-left': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'right' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'right' }
        },
        'extend-up': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' }
        },
        'extend-down': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' }
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }
        }
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
        `,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-pulse',
    'animate-ping',
    'animate-wave',
  ],
};
