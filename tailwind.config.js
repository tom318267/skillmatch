/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS files in src
    "./public/index.html", // Scans your HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F3B63",
        secondary: "#2D6AAD",
      },
      backgroundImage: {
        category: "url('/public/images/categorybg.jpg')",
        gray1: "url('/public/images/gray1.jpg')",
        gray2: "url('/public/images/gray2.jpg')",
        gray3: "url('/public/images/gray3.jpg')",
        gray4: "url('/public/images/gray4.jpg')",
        gray5: "url('/public/images/gray5.jpg')",
        gray6: "url('/public/images/gray6.jpg')",
        gray7: "url('/public/images/gray7.jpg')",
        gray8: "url('/public/images/gray8.jpg')",
        gray9: "url('/public/images/bgray3.jpg')",
        gray10: "url('/public/images/gray10.jpg')",
        gray11: "url('/public/images/gray11.jpg')",
        gray12: "url('/public/images/gray12.jpg')",
        gray13: "url('/public/images/gray13.png')",
        blue1: "url('/public/images/blue1.jpg')",
        blue2: "url('/public/images/blue2.jpg')",
        geo: "url('/public/images/geo.jpg')",
      },
    },
  },
  plugins: [],
};
