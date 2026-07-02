import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      fontFamily: {
        vietnam: ["var(--font-vietnam)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
