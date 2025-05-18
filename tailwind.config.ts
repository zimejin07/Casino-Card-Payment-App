import type { Config } from "tailwindcss";

const config = {
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
      borderRadius: {
        lg: "16px",
        xl: "24px",
        full: "100px",
      },
      spacing: {
        4: "4px",
        8: "8px",
        16: "16px",
        24: "24px",
        32: "32px",
        48: "48px",
        56: "56px",
      },
      fontSize: {
        xs: "10px",
        sm: "14px",
        base: "16px",
        xl: "24px",
        "2xl": "30px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
