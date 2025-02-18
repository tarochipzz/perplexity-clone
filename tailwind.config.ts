import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFAF4",
        foreground: "var(--foreground)",
        primary: "#20808D",
        primaryDark: "#133B39",
        primaryLight: "#2E5E5A",
        actionBackround: "#bcd1d0",
      },
    },
  },
  plugins: [],
} satisfies Config;
