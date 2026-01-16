/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17bfcf',
        'background-light': '#f9fafb',
        'background-dark': '#121416',
        'surface-dark': '#1c1f24',
        'accent-blue': '#3D8AFB',
        'accent-orange': '#F06520',
        'border-dark': '#2d3339',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
