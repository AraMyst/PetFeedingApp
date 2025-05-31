// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Paths to all template files for purging unused styles in production
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
    // Override default breakpoints so that ‘md’ starts at 600px
    screens: {
      // “md:” classes will now apply at min-width: 600px
      md: "600px",
      // Keep the remaining breakpoints at their Tailwind defaults
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    }
  },
  plugins: [],
}
