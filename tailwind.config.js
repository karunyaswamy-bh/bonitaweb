/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B1D2F', // Royal Silk Maroon
          hover: '#521422',
          light: '#F8EEF0',
        },
        accent: {
          DEFAULT: '#D4AF37', // Vintage Zari Gold
          hover: '#B5942B',
          light: '#FAF6E6',
        },
        secondary: {
          DEFAULT: '#1E4E54', // Deep Teal Accent
          light: '#EBF4F5',
        },
        neutral: {
          cream: '#FCFBF7',
          charcoal: '#2C2523',
          muted: '#706461',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(107, 29, 47, 0.08)',
        'premium-hover': '0 10px 25px -3px rgba(107, 29, 47, 0.15)',
      }
    },
  },
  plugins: [],
}
