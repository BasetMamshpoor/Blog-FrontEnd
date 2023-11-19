/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '10': '10px'
      },
      screens: {
        'xs': '425px'
      }
    },
  },
  plugins: [],
}