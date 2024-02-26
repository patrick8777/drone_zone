const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Removed spaces between file extensions and commas
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms')],
});