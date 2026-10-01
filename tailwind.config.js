// Font stacks with fallbacks so text never drops to a serif while web fonts load.
const sans = ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif']
const mono = ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'inverse-on-surface': '#313030', 'on-tertiary-fixed-variant': '#47464a', 'error-container': '#93000a',
        'on-primary': '#2f3131', 'on-error-container': '#ffdad6', 'on-tertiary-fixed': '#1b1b1e', 'primary-fixed': '#e2e2e2',
        tertiary: '#ffffff', 'primary-container': '#e2e2e2', 'on-background': '#e5e2e1', primary: '#ffffff',
        'tertiary-container': '#e4e1e5', 'on-tertiary-container': '#656467', 'surface-container-lowest': '#0e0e0e',
        'tertiary-fixed': '#e4e1e5', 'secondary-fixed-dim': '#c6c5cf', 'primary-fixed-dim': '#c6c6c7', surface: '#131313',
        'on-error': '#690005', 'surface-tint': '#c6c6c7', 'surface-variant': '#353534', 'secondary-fixed': '#e3e1ec',
        'surface-container-high': '#2a2a2a', 'on-surface-variant': '#c4c7c8', 'on-primary-fixed': '#1a1c1c',
        'on-secondary-container': '#bcbbc5', 'on-surface': '#e5e2e1', 'on-secondary': '#2f3038', 'inverse-surface': '#e5e2e1',
        outline: '#8e9192', 'on-primary-container': '#636565', 'outline-variant': '#444748', 'surface-bright': '#3a3939',
        'on-primary-fixed-variant': '#454747', background: '#131313', error: '#ffb4ab', 'secondary-container': '#4a4b53',
        'surface-container': '#201f1f', 'on-tertiary': '#303033', 'inverse-primary': '#5d5f5f', 'surface-dim': '#131313',
        'on-secondary-fixed-variant': '#46464e', 'surface-container-highest': '#353534', 'on-secondary-fixed': '#1a1b22',
        'tertiary-fixed-dim': '#c8c6c9', secondary: '#c6c5cf', 'surface-container-low': '#1c1b1b',
        // DESIGN.md hairline structurals
        hairline: '#27272a', 'hairline-dim': '#18181b',
      },
      // DESIGN.md: sharp corners everywhere; only status dots are round.
      // Motion system: one signature curve, three durations (see DESIGN.md "illuminated instrument").
      transitionTimingFunction: { instrument: 'cubic-bezier(0.2, 0, 0, 1)' },
      transitionDuration: { quick: '120ms', standard: '240ms', slow: '480ms' },
      keyframes: {
        'panel-in': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        'panel-in': 'panel-in 240ms cubic-bezier(0.2, 0, 0, 1)',
        blink: 'blink 1s steps(1) infinite',
      },
      borderRadius: { none: '0', DEFAULT: '0', sm: '0', md: '0', lg: '0', xl: '0', full: '9999px' },
      spacing: {
        'gutter-sm': '1rem', 'space-lg': '1.5rem', 'space-xl': '2.5rem', 'space-sm': '0.5rem', 'margin-sm': '1rem',
        'margin-lg': '4rem', 'space-xs': '0.25rem', margin: '2rem', 'space-md': '1rem', 'gutter-lg': '2rem', gutter: '1.5rem',
      },
      fontFamily: {
        sans, mono,
        'headline-lg': sans, 'body-md': sans, 'metric-number': mono, 'code-display': mono,
        'label-mono': mono, 'display-hero': sans, 'headline-lg-mobile': sans, 'headline-sm': sans,
        'body-sm': sans, 'body-lg': sans, 'metric-number-sm': mono, 'display-hero-mobile': sans,
        'code-body': mono, 'headline-md': sans,
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.03em', fontWeight: '500' }],
        'body-md': ['14px', { lineHeight: '22px', letterSpacing: '0em', fontWeight: '400' }],
        'metric-number': ['32px', { lineHeight: '36px', letterSpacing: '-0.03em', fontWeight: '600' }],
        'code-display': ['20px', { lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'label-mono': ['11px', { lineHeight: '14px', letterSpacing: '0.06em', fontWeight: '500' }],
        'display-hero': ['56px', { lineHeight: '64px', letterSpacing: '-0.04em', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'headline-sm': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-sm': ['12px', { lineHeight: '18px', letterSpacing: '0em', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '26px', letterSpacing: '0em', fontWeight: '400' }],
        'metric-number-sm': ['20px', { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-hero-mobile': ['36px', { lineHeight: '42px', letterSpacing: '-0.03em', fontWeight: '600' }],
        'code-body': ['13px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
