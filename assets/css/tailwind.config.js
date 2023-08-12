const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: 'class',
  content: [
    "./themes/**/layouts/**/*.{html,md}",
    "./content/**/layouts/**/*.{html,md}",
    "./layouts/**/*.{html,md}",
    "./content/**/*.{html,md}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
        'serif': ['Times New Roman', ...defaultTheme.fontFamily.serif],
      },
    },
    fontWeight: {
      normal: '300',
      medium: '300',
      semibold: '400',
      bold: '500',
      extrabold: '600',
      black: '700',
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, theme }) {
      addBase({
        'html': { fontSize: "18px" },
      })
    })
  ]
}
