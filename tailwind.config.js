/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],    //nueva sintaxis para TailWind CSS 3.0
   darkMode: 'media', // or 'media' or 'class'
   theme: {
     extend: {},
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }