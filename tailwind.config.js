/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      playfair: ['Playfair Display', 'serif'],
      raleway: ['Raleway', 'sans-serif'],
      dmserif: ['DM Serif Display', 'serif'],
    },
      colors: {
        cream: "#fdfaf6",
      },
    },
  },
  plugins: [],
};
