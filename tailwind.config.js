import daisyUI from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fca",
        },
      },
      gridAutoRows: {
        fr: "minmax(0, 1fr)",
      },
    },
  },
  plugins: [daisyUI],
};
