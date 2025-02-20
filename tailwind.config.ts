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
        background: "#f2f0e1",
        foreground: "var(--foreground)",
        primary: "#20808D",
        primaryDark: "rgba(19, 59, 57)",
        primaryLight: "rgba(46, 94, 90)",
        actionBackround: "rgba(19, 59, 57, 0.2)",
        actionBackroundLight: "rgba(46, 94, 90, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
