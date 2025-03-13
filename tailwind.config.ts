import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          yellow: "#FFA800",
          lightyellow: "#FFD280",
          gray: "#2D3748",
          lightgray: "#F7FAFC",
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
