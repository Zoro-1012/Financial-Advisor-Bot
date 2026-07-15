/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base "night ledger" palette
        ink: "#0B1120",       // page background
        surface: "#121A2E",   // card/panel background
        surfaceRaised: "#1B2540",
        line: "#26314D",      // hairline borders
        gold: "#C9A227",      // primary accent — CTAs, focus states
        goldSoft: "#E4C766",
        // Risk-depth tier colors (meaningful, not decorative — encode risk level)
        safe: "#2DD4BF",
        safeDeep: "#0F766E",
        balanced: "#60A5FA",
        balancedDeep: "#1D4ED8",
        aggressive: "#F97354",
        aggressiveDeep: "#B23A22",
        ink2: "#8A93A6", // secondary text
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "depth-safe": "linear-gradient(180deg, rgba(45,212,191,0.08) 0%, rgba(45,212,191,0.02) 100%)",
        "depth-balanced": "linear-gradient(180deg, rgba(96,165,250,0.10) 0%, rgba(96,165,250,0.03) 100%)",
        "depth-aggressive": "linear-gradient(180deg, rgba(249,115,84,0.12) 0%, rgba(249,115,84,0.04) 100%)",
      },
    },
  },
  plugins: [],
};
