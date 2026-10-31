import defaultTheme from "tailwindcss/defaultTheme";

// Colors are CSS variables (see src/index.css) so light/dark themes swap in one place.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        sunken: token("sunken"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "on-accent": token("on-accent"),
      },
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans],
        display: ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": {
          from: { opacity: "0", transform: "scale(.97) translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        "slide-in": { from: { transform: "translateX(100%)" }, to: { transform: "none" } },
        "fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "scale-out": {
          from: { opacity: "1", transform: "none" },
          to: { opacity: "0", transform: "scale(.96) translateY(8px)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "fade-up": "fade-up .8s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fade-in .2s ease-out both",
        "scale-in": "scale-in .3s cubic-bezier(.2,.7,.2,1) both",
        "slide-in": "slide-in .4s cubic-bezier(.2,.7,.2,1) both",
        "fade-out": "fade-out .35s ease-in forwards",
        "scale-out": "scale-out .35s cubic-bezier(.4,0,1,1) forwards",
      },
    },
  },
  plugins: [],
};
