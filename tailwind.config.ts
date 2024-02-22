import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import animate from 'tailwindcss-animate'

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
        light: 'rgb(var(--primary-light) / <alpha-value>)',
        dark: 'rgb(var(--primary-dark) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
        dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
      },
      base: {
        black: 'rgb(var(--base-black) / <alpha-value>)',
        grey: {
          DEFAULT: 'rgb(var(--base-grey) / <alpha-value>)',
          light: 'rgb(var(--base-grey-light) / <alpha-value>)',
        },
        white: 'rgb(var(--base-white) / <alpha-value>)',
      },
      black: colors.black,
      transparent: colors.transparent,
    },
    borderRadius: { none: '0', DEFAULT: '0.5rem', md: '0.75rem', lg: '1rem' },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      arrow: "'→'",
    },
    extend: {
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 16s ease infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
}
export default config
