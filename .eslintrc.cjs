/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { project: true },
  plugins: ["@typescript-eslint", "import", "simple-import-sort"],
  extends: [
    "next/core-web-vitals", // Next.js rules (includes react + jsx-a11y + hooks)
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint-config-prettier", // turn off rules that conflict with Prettier
  ],
  rules: {
    // Import hygiene & sorting
    "import/order": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    // TS niceties (tighten or loosen to taste)
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    // Next specifics
    "@next/next/no-img-element": "off", // if you purposely use <img>
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
  ignorePatterns: [".next/**", "node_modules/**", "coverage/**", "dist/**"],
};
