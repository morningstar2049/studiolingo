/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-firago)"],
      },
      keyframes: {
        appear: {
          "0%, 50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        appear: "appear 1000ms ease-in",
      },
    },
    colors: {
      "lingo-green": "#2f9e4d",
    },
  },
  plugins: [],
};
