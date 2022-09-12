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
        'smoky-black': '#0E0C0C',
        'onyx-black': '#161414',
        'deep-sky-blue': '#1187F3',
        'jungle-gray': '#222',
      },
      height: {
        'screen-3/5': '60vh',
        'screen-3/4': '75vh',
        'screen-7/10': '70vh',
      },
      dropShadow: {
        bright: '0px 4px 15px rgba(255, 255, 255, 0.03)',
      },
    },
  },
  plugins: [],
};
