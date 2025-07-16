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
        titleBlue: "#263332",
        bodyBlue: "#3D5352",
        titlePink: "#5a2c16",
        bodyPink: "#6E574C",
        pastelYellow: "#F7CB55",
        pastelPink: "#FFCCB3",
        body: "#626158",
        shadow: "#343638",
        placeholder: "#AEAD9F",
      },
      dropShadow: {
        base: "4px 4px 0 #343638",
      },
    },
  },
  plugins: [],
} satisfies Config;
