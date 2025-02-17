import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'mirc-green': '#33ff33', // Cor verde típica do mIRC
        'mirc-black': '#2f2f2f', // Fundo escuro
        'mirc-gray': '#383838',  // Para bordas e textos
      },
      fontFamily: {
        sans: ['"Courier New"', 'monospace'], // Fonte monoespaçada como no mIRC
      },
    },
  },
  plugins: [],
} satisfies Config;
