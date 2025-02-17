import type { Config } from "tailwindcss";

export default {
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
        hoverDark: "#133B39",
        hoverLight: "#2E5E5A",
        actionBackround: "#b4dbe0"
      },
    },
  },
  plugins: [],
} satisfies Config;
