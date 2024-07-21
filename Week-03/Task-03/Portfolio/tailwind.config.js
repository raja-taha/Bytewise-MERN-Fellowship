/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    colors: {
      black:'#000000',
      sky500: '#007FFF',
      neutral800: '#1C2226',
      stone900: '#1E1E1E',
      zinc800: '#21282D',
      zinc850: '#25282A',
      zinc300: '#D9D9D9',
      white: '#FFFFFF',
    },
    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
    }
  },
  plugins: [],
}

