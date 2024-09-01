/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist:[
    {
      pattern: /grid-cols-\d+/,

    },
    {
      pattern: /row-span-\d+/,
    },
    {
      pattern: /bg-.*-500/,
    },
    {
      pattern: /bg-.*-100/,
    },

  ],
  theme: {
    extend: {
     
      fontFamily: {
        sans: ["Open Sans"]
      },
      gridTemplateRows:{
        '16': 'repeat(16,minmax(0,1fr))',
        '20': 'repeat(20,minmax(0,1fr))',
        '24': 'repeat(24,minmax(0,1fr))',
        '28': 'repeat(28,minmax(0,1fr))',
        '32': 'repeat(32,minmax(0,1fr))',
        '36': 'repeat(36,minmax(0,1fr))',
        '40': 'repeat(40,minmax(0,1fr))',
        '44': 'repeat(44,minmax(0,1fr))',
        '48': 'repeat(48,minmax(0,1fr))',
        '52': 'repeat(52,minmax(0,1fr))',
        '56': 'repeat(58,minmax(0,1fr))',
        '60': 'repeat(60,minmax(0,1fr))',
        '64': 'repeat(64,minmax(0,1fr))',
        '68': 'repeat(68,minmax(0,1fr))',
        '72': 'repeat(62,minmax(0,1fr))',
      },
      gridRow: {
        'span-3': 'span 3 / span 3',
        'span-7': 'span 7 / span 7',
        'span-11': 'span 13 / span 13',
        'span-15': 'span 15 / span 15',
        'span-19': 'span 19 / span 19',
        'span-23': 'span 23 / span 23',
        'span-29': 'span 29 / span 29',
      },

      gridTemplateColumns:{
        "1/5": "1fr 5fr",
        "1/10": "1fr 10fr",
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(70px, 1fr))',
        '21': 'repeat(21, minmax(70px, 1fr))',
        '22': 'repeat(22, minmax(70px, 1fr))',
        '23': 'repeat(23, minmax(70px, 1fr))',
        '24': 'repeat(24, minmax(70px, 1fr))',
        '25': 'repeat(25, minmax(70px, 1fr))',
        '26': 'repeat(26, minmax(70px, 1fr))',
        '27': 'repeat(27, minmax(70px, 1fr))',
        '28': 'repeat(28, minmax(70px, 1fr))',
        '29': 'repeat(29, minmax(70px, 1fr))',
        '30': 'repeat(30, minmax(70px, 1fr))',
        '31': 'repeat(31, minmax(70px, 1fr))',
        '32': 'repeat(32, minmax(70px, 1fr))',
        '33': 'repeat(33, minmax(70px, 1fr))',
        '34': 'repeat(34, minmax(70px, 1fr))',
        '35': 'repeat(35, minmax(70px, 1fr))',
        '36': 'repeat(36, minmax(70px, 1fr))',
        '37': 'repeat(37, minmax(70px, 1fr))',
        '38': 'repeat(38, minmax(70px, 1fr))',
        '39': 'repeat(39, minmax(70px, 1fr))',
        '40': 'repeat(40, minmax(70px, 1fr))',
        '41': 'repeat(41, minmax(70px, 1fr))',
      }
    },
  },
  plugins: [],
}

