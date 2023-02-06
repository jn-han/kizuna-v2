/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'inter': 'Inter'
    },
    fontWeight: {
      'black': '900',
      'extra-bold': '800',
      'semi-bold': '600',
      'regular': '400'
    },
    colors: {
      'accent': '#3BC68F',
      'background': '#0C1324',
      'header': '#202A40',
      'black': '#000000',
      'grey': '#808080',
      'white': '#FFFFFF',
    },
  },
  plugins: [],
}