/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          '50': '#f7f7f7',
          '100': '#eaeaea',
          '200': '#d1d1d1',
          '300': '#b7b7b7',
          '400': '#8f8f8f',
          '500': '#676767',
          '600': '#5d5d5d',
          '700': '#4e4e4e',
          '800': '#3e3e3e',
          '900': '#333333',
        },
      },
    },
  },
  plugins: [

  ],
});
