import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: "var(--font-quicksand)",
        golos: "var(--font-golos)",
      },
      colors: {
        "light-green": "#659654",
        gray: "#464646",
        "dark-gray": "#171717",
        "dark-grey": "#1C1C1C",
        "light-gray": "#EFEFEF",
        green: "#223F18",
        red: "#8B1919",
        gold: "#C49B48",
        "light-gold": "#E3BE60",
        "dark-gold": "#49402E",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "123px",
      },
    },
    transitionTimingFunction: {
      DEFAULT: "ease-in-out",
    },
    transitionDuration: {
      DEFAULT: "420ms",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
