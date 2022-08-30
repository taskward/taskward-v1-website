/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#50c878",
          100: "#e5f6e8",
          200: "#caeed1",
          300: "#aee5ba",
          400: "#92dba4",
          500: "#73d28e",
          600: "#50c878", // DEFAULT
          700: "#45a463",
          800: "#39814f",
          900: "#2e5f3c",
        },
        noteDark: {
          DEFAULT: "#36393f",
        },
        noteSecondTextDark: {
          DEFAULT: "#dcddde",
        },
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
};
