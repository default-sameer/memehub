module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
      'background': '#0f0e17',
      'head': '#fffffe',
      'paragraph': '#a7a9be',
      'stroke': '#232323',
      'button': '#ff8906',
      'button-text': '#fffffe',
      'primary': '#fffffe',
      'secondary': '#f25f4c',
      'tertiary': '#e53170',
      'highlight': '#ff8906',
    },
    keyframes: {
        'text-shimmer': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/aspect-ratio'), require('tailwind-scrollbar')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}
