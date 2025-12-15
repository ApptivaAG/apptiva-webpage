import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'selector',
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
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      // Fluid default text size: 16px on small screens -> 20px on very large screens.
      'fluid-base': ['clamp(1rem, 0.95rem + 0.25vw, 1.25rem)', { lineHeight: '1.6' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['4rem', { lineHeight: '1' }],
      '7xl': ['5rem', { lineHeight: '1' }],
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
      destructive: 'rgb(var(--destructive) / <alpha-value>)',
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
      inherit: colors.inherit,
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      full: '9999px',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      arrow: "'→'",
    },
    extend: {
      gridColumn: {
        left: 'left',
        right: 'right',
      },
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
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
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
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--primary))',
            '--tw-prose-headings': 'rgb(var(--primary))',
            '--tw-prose-lead': 'rgb(var(--primary))',
            '--tw-prose-links': 'rgb(var(--primary))',
            '--tw-prose-bold': 'rgb(var(--primary))',
            '--tw-prose-counters': 'rgb(var(--primary) / 0.8)',
            '--tw-prose-bullets': 'rgb(var(--primary) / 0.4)',
            '--tw-prose-hr': 'rgb(var(--primary) / 0.3)',
            '--tw-prose-quotes': 'rgb(var(--primary))',
            '--tw-prose-quote-borders': 'rgb(var(--primary) / 0.2)',
            '--tw-prose-captions': 'rgb(var(--primary))',
            '--tw-prose-code': 'rgb(var(--primary))',
            '--tw-prose-pre-code': 'rgb(var(--primary) / 0.2)',
            '--tw-prose-pre-bg': 'rgb(var(--primary))',
            '--tw-prose-th-borders': 'rgb(var(--primary) / 0.3)',
            '--tw-prose-td-borders': 'rgb(var(--primary) / 0.2)',
            fontSize: 'clamp(1rem, 0.95rem + 0.25vw, 1.25rem)',
            lineHeight: '1.6',
            'h1,h2,h3,h4,h5,h6': {
              fontWeight: '600',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [animate, typography],
}

function round(num: number) {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
}
function rem(px: number) {
  return `${round(px / 16)}rem`
}
export default config
