/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-400': '#A0AEC0',
        'gray-700': '#2D3748',
        'gray-800': '#1A202C',
      },
    },
  },
  plugins: [],
};
