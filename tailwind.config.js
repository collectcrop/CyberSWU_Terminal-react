/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customed-color': '#EAF3FC',
        'customed-color-hover': '#BBC3CA'
      },
    },
  },
  plugins: [],
}

