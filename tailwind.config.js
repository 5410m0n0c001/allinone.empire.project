/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./site/**/*.html', './site/assets/app.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0a1824',   // azul noche
        sea: '#0f5c6e',   // mar de Cortes
        sand: '#efe6d8',  // arena
        cream: '#faf7f1',
        gold: '#d4a95a',  // atardecer
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
};
