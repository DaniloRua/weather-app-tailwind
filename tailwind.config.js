/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
    },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      }
    },
  },
  plugins: [],
}
