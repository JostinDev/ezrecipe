import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        ptSerif: ["var(--font-ptSerif)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "#FAF4E1",
        title: "#12100C",
      },
    },
  },
  plugins: [],
} satisfies Config;
