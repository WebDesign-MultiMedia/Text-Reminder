/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{html,js,css}",  // For styles, any test/demo files
    "./public/**/*.{html,js}",   // For JS in /public (like app.js)
    "./index.html"  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

