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
          700: '#0E3B20',
          800: '#0A2916',
          900: '#071C0F',
        },
        accent: {
          500: '#381331'
        }
      }
    },
  },
  plugins: [],
}

