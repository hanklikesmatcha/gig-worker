/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        indigo: '#5c6ac4',
        lighter: '#b3bcf5',
        dark: '#002e63',
      },
    },
  },
  plugins: [],
}
