import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        casumo: {
          purple: "#4C00C2",
          purpleDark: "#3B058E",
          grayText: "#798291",
          error: "#FC484C",
          success: "#19AC51",
        },
      },
    },
  },
  plugins: [],
};

export default config;
