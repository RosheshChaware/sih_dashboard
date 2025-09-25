/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* white-10 */
        input: "var(--color-input)", /* gray-900 */
        ring: "var(--color-ring)", /* electric-blue */
        background: "var(--color-background)", /* deep-black */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* electric-blue */
          foreground: "var(--color-primary-foreground)", /* deep-black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* charcoal */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* bright-red-pink */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* charcoal */
          foreground: "var(--color-muted-foreground)", /* gray-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* vibrant-green */
          foreground: "var(--color-accent-foreground)", /* deep-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* gray-900 */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-900 */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant-green */
          foreground: "var(--color-success-foreground)", /* deep-black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* orange */
          foreground: "var(--color-warning-foreground)", /* deep-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* bright-red-pink */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* gray-900 */
        "surface-foreground": "var(--color-surface-foreground)", /* white */
        "text-primary": "var(--color-text-primary)", /* white */
        "text-secondary": "var(--color-text-secondary)", /* gray-400 */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'primary': '0 4px 6px rgba(0, 212, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
        'secondary': '0 2px 4px rgba(0, 0, 0, 0.2)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.5)',
        'glow-primary': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-error': '0 0 20px rgba(255, 51, 102, 0.3)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 1.5s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spring": "spring 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" },
        },
        "spring": {
          "0%": { transform: "scale(0.8) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.1) rotate(5deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'navigation': '1000',
        'dropdown': '1010',
        'mobile-menu': '1020',
        'assessment': '1030',
        'modal': '2000',
        'notification': '2010',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}