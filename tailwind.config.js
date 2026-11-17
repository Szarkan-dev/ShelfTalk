/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F1E9D7',
          300: '#E6D7BE',
          400: '#D6C09D',
          500: '#C2A578',
        },
        shelf: {
          dark: '#1E1B18',
          wood: '#4A3728',
          amber: '#D97706',
          gold: '#F59E0B',
          sage: '#10B981',
          crimson: '#E11D48',
          navy: '#1E293B',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.08)',
        'book-hover': '0 16px 32px -4px rgba(0, 0, 0, 0.18), 0 8px 12px -3px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
