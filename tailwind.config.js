import { animate, keyframes } from "framer-motion";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],


theme: {
  extend: {
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
    },
    // Aqui podriamos definir una animación personalidad con otro tiempo
    animation: {
      shimmer: 'shimmer 1.5s infinite',
    },
  },
}

};