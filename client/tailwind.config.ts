/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "stone-100": "#FFFDED",
        // "stone-100": "#111c21",
        "green-100": "#568EA3",
        "yellow-100": "#FCE762",
        "orange-100": "#FFB17A",
        "orangedark-100": "#FFA96A",
        "darkgreen-100": "#256D85",
      },

      // colors: {
      //
      //
      //  lightblue: "68c3d4",
      //   yellow: "FCE762",
      //   orange: "FFB17A",
      //   cream: "FFE8D1",
      // },
    },
  },
  plugins: [],
};
