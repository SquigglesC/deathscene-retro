import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EB0000", // red color
        dark: "#0F0F0F",
        light: "#EBEBEB",
        gray: "#A4A4A4",
      },
    },
    screens: {
      md: "640px", // Small devices (e.g., tablets)
      lg: "1024px", // Large devices (e.g., desktops)
      xl: "1280px", // Extra-large devices
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};