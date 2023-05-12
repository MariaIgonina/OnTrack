/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "stone-100": "#FFFDED",
        "green-100": "#568EA3",
        "yellow-100": '#FCE762',
        "orange-100": "#FFB17A",
        "darkest-100": "#568EA3"
      },

      // colors: {
      //   blue: "#568EA3",
      //   background: "FFFDED",
      //  lightblue: "68c3d4",
      //   yellow: "FCE762",
      //   orange: "FFB17A",
      //   cream: "FFE8D1",
      // },
    },
  },
  plugins: [],
};
