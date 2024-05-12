/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        qhd: '2560px',
      },
      backgroundImage: {
        'main-img': "url('@/assets/img/background/movieHome.png')",
        'screen-image': "url('/images/screenshot.png')",
      },

      backgroundColor: {
        opacityGray: 'rgba(45,45,45,0.55)',
        gray: 'rgba(45,45,45)',
        lightPurple: '#A060F2',
      },
      colors: {
        mint: '#60F2BE',
      },
      fontFamily: {
        summer: ['summer', 'sans-serif'],
        kbiz: ['kbiz', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
