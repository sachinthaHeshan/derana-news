/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lava-red': '#D8040A',
        'granite-gray': '#847F7F',
        'white-alpha-30': '#ffffff1E',
        'white-alpha-2': '#ffffff02',
        'black-alpha-80': '#000000CC',
        'smoky-black': '#0E0C0C',
        'onyx-black': '#141414',
        'deep-sky-blue': '#1187F3',
        'jungle-gray': '#222',
        'black-eel': '#444444',
        'baltic-gray': '#272727',
      },
      height: {
        'screen-3/5': '60vh',
        'screen-3/4': '75vh',
        'screen-7/10': '70vh',
      },
      dropShadow: {
        bright: '0px 4px 15px rgba(255, 255, 255, 0.03)',
      },
      scale: {
        101: '1.01',
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [],
};
