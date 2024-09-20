/** @type {import('tailwindcss').Config} */
import { type Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "var(--white)",
      black: "var(--black)",
      transparent: "transparent",
      black_100: "var(--black-100)",
      black_90: "var(--black-90)",
      black_80: "var(--black-80)",
      black_70: "var(--black-70)",
      black_60: "var(--black-60)",
      black_50: "var(--black-50)",
      black_40: "var(--black-40)",
      black_30: "var(--black-30)",
      black_20: "var(--black-20)",
      black_10: "var(--black-10)",
      gray_10: "var(--gray-10)",
      main_black: "var(--main-black)",
      main_bg: "var(--main-bg)",
      stroke: "var(--stroke)",
      error: "var(--error)",
      error_light: "var(--error-light)",
      success: "var(--success)",
      red: "var(--red)",
    },

    extend: {
      fontFamily: {
        SFPro: ["SF Pro Text", "sans-serif"],
        Graphik: ["Graphik", "sans-serif"],
      },

      backgroundImage: {
        "dots-bg": "url('/images/dots.svg')",
        "no-products-bg": "url('/images/no-products-bg.svg')",
        "no-categories-bg": "url('/images/no-categories-bg.svg')",
        "welcome-bg": "url('/images/welcome-bg.svg')",
        search: "url('/icons/search.svg')",
        select: "url('/icons/select.svg')",
        "input-arrow": "url('/icons/input-arrow.svg')",
        "tapply-coin": "url('/images/tapply-bg.svg')",
        "confirmation-bg": "url('/images/confirmation-bg.svg')",
        "newsletter-bg": "url('/images/newsletter-bg.svg')",
        "coupon-bg": "url('/images/coupon-bg.svg')",
      },

      boxShadow: {
        navItem: "0 0 16px 0 rgba(45, 50, 66, 0.3)",
        select: "0 8px 24px 0 rgba(45, 49, 63, 0.1)",
        dropdown: "0 0 20px 0 rgba(61, 63, 69, 0.25)",
        "rounded-button": "0 0 11px 0 rgba(45, 50, 66, 0.8)",
        "control-panel": "0 0 20px 0 rgba(61, 63, 69, 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
