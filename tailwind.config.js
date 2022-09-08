/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lava-red': '#D8040A',
        'granite-gray': '#847F7F',
        'white-alpha-30': '#ffffff1E',
      },
      height: {
        'screen-3/5': '60vh',
        'screen-3/4': '75vh',
        'screen-7/10': '70vh',
      },
    },
  },
  plugins: [],
};
