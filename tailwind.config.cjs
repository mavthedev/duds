const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const skeleton = require('@skeletonlabs/skeleton/tailwind/theme.cjs')

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",
  require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],

  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [forms, typography, skeleton],
};

module.exports = config;
