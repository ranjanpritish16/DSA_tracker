import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0F1115",
        panel: "#161920",
        panel2: "#1D212B",
        line: "#272C38",
        ink: "#E7E9EE",
        dim: "#8B92A4",
        catA: "#3FB27F",
        catB: "#4E8FF0",
        catC: "#E0A93E",
        catD: "#E15B5B",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
