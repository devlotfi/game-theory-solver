import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      layout: {
        radius: {
          small: "5px",
          medium: "7px",
          large: "9px",
        },
      },
      themes: {
        light: {
          colors: {
            divider: "#6A7F8B",
            foreground: "#2c4271",
            background: {
              foreground: "#2c4271",
            },
            default: {
              foreground: "#2c4271",
            },
            primary: {
              DEFAULT: "#D87E2A",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            divider: "#575f69",
            foreground: "#E7EFF2",
            content1: {
              DEFAULT: "#243740",
              foreground: "#E7EFF2",
            },
            content2: {
              DEFAULT: "#131F24",
              foreground: "#E7EFF2",
            },
            background: {
              DEFAULT: "#131F24",
              foreground: "#E7EFF2",
            },
            default: {
              foreground: "#E7EFF2",
            },
            primary: {
              DEFAULT: "#D87E2A",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
