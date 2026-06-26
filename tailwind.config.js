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
          DEFAULT: '#571b26', // Deep Royal Burgundy
          hover: '#3a0e16',
          light: '#f5e8ea',
        },
        accent: {
          DEFAULT: '#d4af37', // Champagne Gold
          hover: '#b59223',
          light: '#fbf8f0',
        },
        secondary: {
          DEFAULT: '#907e71', // Warm Beige
          light: '#f4f1ed',
        },
        neutral: {
          cream: '#fdfcf8', // Ivory White
          charcoal: '#1a1716', // Deep Charcoal
          muted: '#857d7b',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(26, 23, 22, 0.1)',
        'premium-hover': '0 20px 50px -15px rgba(26, 23, 22, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
