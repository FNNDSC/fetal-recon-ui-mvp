import flowbitePlugin from "flowbite/plugin";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Patternfly color palette - Blue family
        // https://staging-v6.patternfly.org/design-foundations/colors
        primary: {
          50: "#F0F0FF",
          100: "#F0F0FF",
          200: "#F0F0FF",
          300: "#F0F0FF",
          400: "#B9DAFC",
          500: "#92C5F9",
          600: "#4394E5",
          700: "#0066CC",
          800: "#004D99",
          900: "#003366",
        },
      },
    },
  },

  plugins: [flowbitePlugin],
} as Config;
