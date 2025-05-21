module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
   safelist: [
    { pattern: /bg-(gray|red|blue|green|yellow)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-(gray|red|blue|green|yellow)-(100|200|300|400|500|600|700|800|900)/ },
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto-Regular"],
      },
      colors: {
        'primary-green': '#00b14f',     
        'dark-green': '#03633e',
        'light-bg': '#eefafa',
        'blue': '#b3ecff',           
        'yellow': '#ffec8e',            
        'orange': '#ffd3ae',            
        'green-start': '#b2eabb',       
        'green-end': '#c8f4cf',       
        'dark-gray': '#243d3a',
        'bright-green': '#02b34f',
        'teal-start': '#5cbaa2',       
        'teal-end': '#4dbccf'          
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(90deg, #b2eabb, #c8f4cf)',
        'teal-gradient': 'linear-gradient(90deg, #5cbaa2, #4dbccf)',
      }
    },
  },
  plugins: [],
};
