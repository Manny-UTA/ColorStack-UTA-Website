/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#16233F",
        cream: "#FAF7F0",
        brass: "#B8935A",
      },
    },
  },
  plugins: [],
};
