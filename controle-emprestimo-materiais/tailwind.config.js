export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaria: {
          50: '#eaf2fb',
          100: '#d3e4f7',
          600: '#0b5cad',
          700: '#084a8c',
          800: '#063a6e',
        },
        destaque: {
          500: '#f7941d',
          600: '#d97e0a',
        },
      },
    },
  },
  plugins: [],
}
