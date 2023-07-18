/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1200px",
        xxl: "1400px",
      },
      colors: {
        black: "#333",
        secondaryBlack: "#555",
        white: "#ffffff",
        lightwhite: "#e3e3e3",
        gray: "#bdbcbc",
        lightGray: "#ddd",
        brown: "#776F9B",
        lightgray: "#4D5279",
        lightbrown: "#8B7AA3",
        orange: "#FFBF00",
        lightOrange: "#ffcd37",
        red: "#FA8072",
        blue: "#00ffff",
        green: "#7fffd4",
        greenDark: "#7CFC00",
        navbarBg: "#5B4250",
      },
    },
  },
  plugins: [],
};
