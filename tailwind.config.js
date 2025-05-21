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
        'custom-primary-green': '#00b14f',     
        'custom-dark-green': '#03633e',
        'custom-light-bg': '#eefafa',
        'custom-blue': '#b3ecff',           
        'custom-yellow': '#ffec8e',            
        'custom-orange': '#ffd3ae',            
        'custom-green-start': '#b2eabb',       
        'custom-green-end': '#c8f4cf',       
        'custom-dark-gray': '#243d3a',
        'custom-bright-green': '#02b34f',
        'custom-teal-start': '#5cbaa2',       
        'custom-teal-end': '#4dbccf'          
      },
      backgroundImage: {
        'custom-green-gradient': 'linear-gradient(90deg, #b2eabb, #c8f4cf)',
        'custom-teal-gradient': 'linear-gradient(90deg, #5cbaa2, #4dbccf)',
      }
    },
  },
  plugins: [],
};
