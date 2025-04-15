/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
],
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#0078FF',
        dark: '#005BBB',
        light: '#E6F0FA',
      },
      secondary: {
        DEFAULT: '#6B7280',
        dark: '#4B5563',
        light: '#F3F4F6',
      },
    },
  },
},
plugins: [],
};
