import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

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
    colors: {
      primary: {
        DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
        dark: 'rgb(var(--primary-dark) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
        dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
      },
      base: {
        black: 'rgb(var(--base-black) / <alpha-value>)',
        grey: 'rgb(var(--base-grey) / <alpha-value>)',
        white: 'rgb(var(--base-white) / <alpha-value>)',
      },
      black: colors.black,
    },
    borderRadius: { none: '0', DEFAULT: '0.5rem', md: '0.75rem', lg: '1rem' },
    extend: {},
  },
  plugins: [],
}
export default config
