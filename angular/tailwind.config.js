module.exports = {
  important: true,
  content: [
    './apps/**/src/**/*.{html,ts}',
    './libs/**/src/**/*.{html,ts}'
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px',
    },
    minHeight: {
      100: '100px',
    },
    extend: {
      colors: {
        accent: {
          100: '#f8c7ca',
          200: '#f4a2a7',
          300: '#f07d83',
          400: '#ec6169',
          500: '#e9454e',
          600: '#e63e47',
          700: '#e3363d',
          800: '#df2e35',
          900: '#d91f25',
          A100: '#ffffff',
          A200: '#ffddde',
          A400: '#ffaaac',
          A700: '#ff9093',
        },
        primary: {
          50: '#ebe9f3',
          100: '#cec8e0',
          200: '#ada4cb',
          300: '#8c7fb6',
          400: '#7463a7',
          500: '#5b4897',
          600: '#53418f',
          700: '#493884',
          800: '#40307a',
          900: '#2f2169',
          A100: '#b8a9ff',
          A200: '#8e76ff',
          A400: '#6443ff',
          A700: '#4f2aff',
        },
        background: {
          300: '#424242',
          500: '#303030',
        },
      },
    },
  },
  plugins: [],
};
