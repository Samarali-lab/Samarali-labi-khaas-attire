import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { maroon: '#800020', gold: '#C9A84C', ivory: '#FAF7F2', charcoal: '#2C2C2C' },
      },
    },
  },
  plugins: [],
};
export default config;
