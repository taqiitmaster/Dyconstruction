/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050607', // page black
        coal: { 900: '#0A0C0F', 800: '#101317', 700: '#171B21', 600: '#212730', 500: '#2E3540' },
        dy: { DEFAULT: '#3AB6FB', deep: '#1C86C9', glow: '#7FD1FF' }, // sampled from the logo tools
        fog: '#C7CED6', // body text on black
        dim: '#7E8894',
        paper: '#EEF3F7', // light bands — a cool "blueprint paper" white
        ink: '#0B1016',
      },
      fontFamily: {
        display: ['"Sora Variable"', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['"Figtree Variable"', 'Figtree', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1320px' },
      keyframes: {
        drift: { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(5%,-6%,0) scale(1.12)' } },
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        pulsering: { '0%': { transform: 'scale(1)', opacity: '.55' }, '70%,100%': { transform: 'scale(1.55)', opacity: '0' } },
        shimmer: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(100%)' } },
      },
      animation: {
        drift: 'drift 30s ease-in-out infinite',
        marquee: 'marquee 46s linear infinite',
        pulsering: 'pulsering 2.4s cubic-bezier(.4,0,.6,1) infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
