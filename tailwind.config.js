
/** @type {import('tailwindcss').Config} */
const { iconsPlugin, dynamicIconsPlugin } = require('@egoist/tailwindcss-icons')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-golden' :'#d7b26a'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin(),
    dynamicIconsPlugin()
  ],
}