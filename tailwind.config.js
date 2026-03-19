/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scraps: {
          bg: '#f4f4f0',
          yellow: '#ffeb3b',
          orange: '#ff8c42',
          blue: '#42a5f5',
          red: '#ef5350',
          black: '#000000',
        }
      },
      fontFamily: {
        brutal: ['System'], // We will use system bold for brutalist fonts visually
        typewriter: ['monospace'], // Monospace font
      }
    },
  },
  plugins: [],
}
