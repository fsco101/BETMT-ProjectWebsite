/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Engineering Manual Palette
        navy: {
          DEFAULT: '#16324F',
          dark: '#0E2135',
          light: '#2A4D70',
          50: '#F0F4F8',
          100: '#D9E2EC',
          900: '#16324F',
        },
        safety: {
          orange: '#F59E0B',
          'orange-hover': '#D97706',
          'orange-light': '#FEF3C7',
          red: '#B42318',
          'red-hover': '#991B1B',
          'red-light': '#FEE2E2',
        },
        surface: {
          white: '#FFFFFF',
          card: '#F1F5F9',
          muted: '#E2E8F0',
          dark: '#0B132B',
          darkcard: '#162238',
        },
        industrial: {
          charcoal: '#1E293B',
          muted: '#64748B',
          light: '#94A3B8',
          border: '#CBD5E1',
          'border-dark': '#334155',
        },
        // Backwards compatibility aliases
        'charcoal-ink': '#16324F',
        'muted-charcoal': '#475569',
        'subtle-ash': '#64748B',
        'hairline-divider': '#E2E8F0',
        'accent-crimson': '#B42318',
        'accent-emerald': '#059669',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
        editorial: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
