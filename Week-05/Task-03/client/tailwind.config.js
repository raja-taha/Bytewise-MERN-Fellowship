/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Red
        "red-500": "hsl(14, 86%, 42%)",
        // Green
        "green-500": "hsl(159, 69%, 38%)",
        // Rose
        "rose-50": "hsl(20, 50%, 98%)",
        "rose-100": "hsl(13, 31%, 94%)",
        "rose-300": "hsl(14, 25%, 72%)",
        "rose-400": "hsl(7, 20%, 60%)",
        "rose-500": "hsl(12, 20%, 44%)",
        "rose-900": "hsl(14, 65%, 9%)",
        "brown-500": "#C83B0E",
      },
      fontFamily: {
        // Red Hat Text font family
        "red-hat-text": ["Red Hat Text", "sans-serif"],
      },
      fontSize: {
        // Body Copy font size
        "body-copy": "16px",
      },
      screens: {
        // Custom screen sizes based on design requirements
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
