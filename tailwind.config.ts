import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config;
