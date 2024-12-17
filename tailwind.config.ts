import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
} satisfies Config;
