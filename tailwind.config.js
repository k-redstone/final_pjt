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
        'no-img': "url('@/assets/img/no_image.png')",
      },

      backgroundColor: {
        opacityGray: 'rgba(45,45,45,0.55)',
        gray: 'rgba(45,45,45)',
        lightPurple: '#A060F2',
        darkIndigo: '#232636',
        lightSky: '#68A9E4',
      },
      colors: {
        mint: '#60F2BE',
        darkIndigo: '#232636',
        lightSky: '#68A9E4',
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
        bounceRight: {
          '0%, 100%': {
            transform: 'translateX(-55%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
        bounceLeft: {
          '0%, 100%': {
            transform: 'translateX(55%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s linear',
        slideUp: 'slideUp 0.3s linear',
        bounceLeft: 'bounceLeft 1.5s infinite',
        bounceRight: 'bounceRight 1.5s infinite',
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
