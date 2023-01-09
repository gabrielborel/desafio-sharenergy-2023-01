/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: "#1BA2A1",
          600: "#189186",
          700: "#158077",
          800: "#105f58",
          900: "#0d4e48",
        },
      },
    },
  },
};
