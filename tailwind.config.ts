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
        background: "#FFF8E0",
        title: "#12100C",
        pastelBlue: "#9DD3D1",
        pastelYellow: "#F7CB55",
        pastelPink: "#FFCCB3",
        body: "#626158",
        shadow: "#343638",
        placeholder: "#AEAD9F",
      },
    },
  },
  plugins: [],
} satisfies Config;
