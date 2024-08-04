const { nextui } = require("@nextui-org/react");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg.svg')",
      },
    },
  },
  plugins: [
    nextui(),
    flowbite.plugin(),
    
  ],
}

