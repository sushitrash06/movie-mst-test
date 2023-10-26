/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF234B",
        secondary: "#68788D",
        success: "#19C29A",
        success2: "#E2FAF4",
        success3: "#B9F7C4",
        warning: "#F78431",
        warning2: "#FFF6E0",
        warning3: "#FBE7C6",
        info: "#2E8CE2",
        info2: "#DEEDFF",
        info3: "#B2E6F4",
        red1: "#CB1335",
        gray1: "#333333",
        gray2: "#C2C2C2",
        gray3: "#99A6B8",
        gray4: "#798F9F",
        gray5: "#E7EAF1",
        gray6: "#B5C0CB",
        gray7: "#D4DDE4",
        lightgray1: "#F3F7FB",
        lightgray2: "#D1D5DB",
        lightgray3: "#F5F7F9",
        lightgray4: "#E9EEF3",
        cyan1: "#28BCDC",
        cyan2: "#F1FDFF",
        orange1: "#F16F55",
        pink1: "#FFECF0",
        white1: "#FFFFFF",
        white2: "#FBFDFE"
      }
    },
  },
  plugins: [],
}