/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{html,js,css}",  // For styles, any test/demo files
    "./public/**/*.{html,js}",   // For JS in /public (like app.js)
    "./index.html"  
  ],
  theme: {
    extend: {
        fontFamily:{
         headings: ["Mozilla Headline", "sans-serif"],
         form: ["Playwrite HU", "cursive"],
      }
    },
  },
  plugins: [],
}

