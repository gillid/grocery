import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [daisyui],
  daisyui: {
    themes: ['retro'],
  },
} satisfies Config;
