/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
    colors: {
      primary: "#FFFFFF",
      primary1: "#363738",
      secondary: "#F5F5F5",
      secondary1: "#FEFAF1",
      bg: "#FFFFFF",
      text: "#FAFAFA",
      text1: "#7D8184",
      text2: "#000000",
      button: "#000000",
      secondary2: "#DB4444",
      button1: "#00FF66",
      button2: "#DB4444",
      hoverButton: "#E07575",
      hoverButton2: "#A0BCE0",
    },
  },
  plugins: [],
};
