/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { sans: ['inter'] },
    extend: {
      fontFamily: {
        'roulette': ['"Libre Baskerville"', 'serif'],
        'lobster': ['lobster', 'serif'],
        'inter': ['inter', 'san-serif']
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))'
      },
      colors: {
        green: {
          100: 'green',
          400: '#15803D',
          500: '#14532D',
          600: '#104224',
          700: '#0c281c',
          800: '#0a2216',
          900: '#071C0F',
        },
        accent: {
          50: '#89D6D2',
          100: '#0C4F4C', // light blue
          150: '#0d3b32',
          200: '#073331', // darker blue
          300: '#331A22', // dark red
          350: '#940E07', // board red
          375: '#520703', // board red
          400: '#c797a2', // lighter red
          450: '#BD909D', // pink
          500: '#381331' // green
        }
      }
    },
  },
  plugins: [],
}

