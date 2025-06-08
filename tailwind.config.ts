import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        playfairDisplay: [
          "var(--font-playfairDisplay)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        primary: "#A3C4F3", // Soft sky blue
        secondary: "#FFB7B2", // Pastel coral pink
        accent: "#FFE382", // Pastel yellow
        background: "#FFF9F4", // Warm creamy white
        surface: "#FDE2E4", // Soft blush
        muted: "#CDEAC0", // Pastel green
        darkText: "#4A4A4A", // Subtle charcoal for text
        lightText: "#888888", // For secondary text
      },
    },
  },
  plugins: [],
} satisfies Config;
