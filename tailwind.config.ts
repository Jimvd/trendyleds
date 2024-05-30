import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'mo': { 'max': '767px' },
      },
      colors: {
        primary: {
          lighter: 'rgb(225 212 180 / 8%)',
          light: '#ffc8dd',
          DEFAULT: '#e6dac4',
          dark: '#e5989b',
        },
        secondary: {
          DEFAULT: '#3E3E3E',
        },
      },
      maxWidth: {
        'custom': '1328px',
      },
    },
  },
  plugins: [],
};

export default config;
