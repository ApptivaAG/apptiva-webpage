import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './content/**/*.{js,ts,jsx,tsx,md}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontWeight: {
      normal: '400',
      bold: '600',
      heavy: '900',
    },
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-dark': 'rgb(var(--secondary-dark) / <alpha-value>)',
        'base-black': 'rgb(var(--base-black) / <alpha-value>)',
        'base-grey': 'rgb(var(--base-grey) / <alpha-value>)',
        'base-white': 'rgb(var(--base-white) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
export default config
