import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hanken: ["var(--font-hanken-grotesk)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        foreground: "rgba(var(--foreground),<alpha-value>)",
        background: "rgba(var(--background),<alpha-value>)",
        contentBackground: "rgba(var(--content-background),<alpha-value>)",
        primary: "rgba(var(--primary),<alpha-value>)",
        primaryDark: "rgba(var(--primary-dark),<alpha-value>)",
        hover: "rgba(var(--primary-dark),0.2)",
        active: "rgba(var(--primary-dark),0.3)",
        textGray: "rgb(var(--text-gray),<alpha-value>)",
        textGrayDark: "rgb(var(--text-gray-dark),<alpha-value>)",
      },
      keyframes: {
        "glow-gradient": {
          "0%": {
            boxShadow: "0 0 20px rgba(252, 255, 214, 0.5)",
            backgroundPosition: "0% 50%",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(252, 255, 214, 0.5)",
            backgroundPosition: "100% 50%",
          },
          "100%": {
            boxShadow: "0 0 20px rgba(252, 255, 214, 0.5)",
            backgroundPosition: "0% 50%",
          },
        },
      },
      animation: {
        "glow-gradient": "glow-gradient 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
