export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom card background colors
        'card-bg-1': '#FBFFF2',
        'card-bg-2': '#FFD52D',
        'card-bg-3': '#FCFAFF',
        'card-bg-4': '#F2FFF4',
        'card-bg-5': "#FFFCF1",

        // Custom primary colors
        'p-1': '#614298',
        'p-2': '#4A2D7F',
        'p-3': '#240D4D',
        'p-4': '#7355A8',
        'p-5': '#4E4559',
        'p-6': '#696984',
        'p-7': '#252641',

         // Custom primary colors
        's-1':'#FFD52D',

        // Grayscale colors
        'g-1': '#818C96',
        'g-2': '#333333',
        'g-3': '#B6B6B6',
        'g-4': '#7B7B79',
        'g-5': '#262626',
        'g-6': '#828282',

        // Additional colors
        'bl': '#000000', // Black
        'dan': '#CA594B', // Danger

        // Background colors
        'b-1': '#FFFFFF',
        'b-2': '#F4EDFF',
        'b-3' : '#E1E1E1',
        'b-4' :  '#FCFCFC',

        // Border colors
        'br-1': '#9C81CC',
        'br-2': '#C4C4C4',
      },
      fontFamily: {
        // Nunito font family
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
}