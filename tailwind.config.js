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
        'community-img': "url('@/assets/img/background/computer_person.png')",
        'screen-image': "url('/images/screenshot.png')",
        'logo-img': "url('@/assets/img/logo.png')",
      },

      backgroundColor: {
        opacityGray: 'rgba(45,45,45,0.55)',
        gray: 'rgba(45,45,45)',
        lightPurple: '#A060F2',
      },
      colors: {
        mint: '#60F2BE',
      },

      keyframes: {
        slideDown: {
          '0% ': { transform: 'translateY(30px)' },
          '100%': { transform: 'translateY(40px)' },
        },
        slideUp: {
          '100% ': { transform: 'translateY(40px)' },
          '0%': { transform: 'translateY(30px)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s linear',
        slideUp: 'slideUp 0.3s linear',
      },
      fontFamily: {
        summer: ['summer', 'sans-serif'],
        kbiz: ['kbiz', 'sans-serif'],
        kbizH: ['kbizH', 'sans-serif'],
        kbizB: ['kbizB', 'sans-serif'],
        kbizR: ['kbizR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
