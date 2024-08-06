
/** @type {import('tailwindcss').Config} */
const { iconsPlugin, dynamicIconsPlugin } = require('@egoist/tailwindcss-icons')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-golden' :'#d7b26a',
        'primary-blue' :'#001C41',
        'secundary-golden' : '#D8B46A',
        'primary-gray' : 'rgb(34, 34, 34)',
        'secundary-gray' : '#666666'
      },
      fontFamily: {
        'header' : ['Montserrat','Helvetica','Arial','Lucida','sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin(),
    dynamicIconsPlugin()
  ],
}