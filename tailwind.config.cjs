/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#50c878',
          100: '#e5f6e8',
          200: '#caeed1',
          300: '#aee5ba',
          400: '#92dba4',
          500: '#73d28e',
          600: '#50c878', // DEFAULT
          700: '#45a463',
          800: '#39814f',
          900: '#2e5f3c'
        },
        darkMode: {
          dark: 'rgb(54,57,63)',
          darker: 'rgb(47,49,54)',
          darkest: 'rgb(32,34,37)'
        },
        noteDark: {
          DEFAULT: '#36393f'
        },
        noteSecondTextDark: {
          DEFAULT: '#dcddde'
        }
      }
    }
  },
  plugins: [require('daisyui')],
  darkMode: ['class'],
  daisyui: {
    styled: true,
    themes: [
      {
        default: {
          primary: '#16a34a',
          secondary: '#f6d860',
          accent: '#50c878',
          neutral: '#3d4451',
          'base-100': '#ffffff'
        }
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-',
    darkTheme: 'dark'
  }
}
