/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: {} },
    colors: {
      royalblue: "#4169e1",
      aldergrey: "#2f3136",
    },
  },
  plugins: [],
};
