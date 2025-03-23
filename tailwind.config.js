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
            divider: "#3f4853",
            foreground: "#2c4271",
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#E7EFF2",
            },
            content2: {
              DEFAULT: "#F4F4F4",
              foreground: "#E7EFF2",
            },
            background: {
              DEFAULT: "#F4F4F4",
              foreground: "#E7EFF2",
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
              DEFAULT: "#242F40",
              foreground: "#E7EFF2",
            },
            content2: {
              DEFAULT: "#131724",
              foreground: "#E7EFF2",
            },
            content3: {
              DEFAULT: "#334b57",
              foreground: "#E7EFF2",
            },
            background: {
              DEFAULT: "#131724",
              foreground: "#E7EFF2",
            },
            default: {
              DEFAULT: "#4a4b5b",
              100: "#23262d",
              200: "#585864",
              400: "#868698",
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
