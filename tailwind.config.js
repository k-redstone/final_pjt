/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-img': "url('@/assets/img/background/movieHome.png')",
        'screen-image': "url('/images/screenshot.png')",
      },
      backgroundColor: {
        opacityGray: 'rgba(45,45,45,0.55)',
      },
      colors: {
        mint: '#60F2BE',
      },
      fontFamily: {
        summer: ['summer', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
