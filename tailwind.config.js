module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
   safelist: [
    // Giữ lại tất cả bg-gray-x và bg-red-x
    { pattern: /bg-(gray|red|blue|green|yellow)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-(gray|red|blue|green|yellow)-(100|200|300|400|500|600|700|800|900)/ },
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto-Regular"],
      },
    },
  },
  plugins: [],
};
