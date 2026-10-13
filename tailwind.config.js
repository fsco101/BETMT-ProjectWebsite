/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-linen": "#F7F5F0",
        "canvas-stone": "#FAF9F5",
        "surface-card": "#F4F0E8",
        "charcoal-ink": "#1C1B1A",
        "muted-charcoal": "#4A4744",
        "subtle-ash": "#7E7973",
        "hairline-divider": "#DCD7CD",
        "accent-crimson": "#8A2528",
        "accent-emerald": "#047857",
        "wood-terracotta": "#C8956A",
      },
      fontFamily: {
        editorial: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
