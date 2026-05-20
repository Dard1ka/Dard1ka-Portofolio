import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light surfaces
        canvas: "#F7FAFF",
        paper: "#FFFFFF",
        cloud: "#EEF4FE",
        // Ink (dark text on light bg)
        ink: {
          950: "#06101F",
          900: "#0B1A2E",
          800: "#13253E",
          700: "#1F3554",
          600: "#39537A",
          500: "#5B7299",
        },
        muted: "#6D7E97",
        hairline: "#DCE6F5",
        // Blue accent (your palette)
        accent: {
          50: "#E9FFFF",
          100: "#C5ECFF",
          200: "#9BD9FF",
          300: "#6DC7FF",
          400: "#48B8FF",
          500: "#21AAFF",
          600: "#1D9CFF",
          700: "#168AFF",
          800: "#1177FF",
        },
        // Tiny pops
        lime: "#C7FF66",
        sun: "#FFD66B",
        coral: "#FF8E72",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { tightest: "-0.02em", soft: "-0.005em" },
      borderRadius: { xl2: "20px", "3xl2": "28px" },
      boxShadow: {
        soft: "0 1px 0 rgba(11,26,46,0.04), 0 12px 30px -12px rgba(17,119,255,0.18)",
        pop: "0 10px 40px -10px rgba(17,119,255,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
