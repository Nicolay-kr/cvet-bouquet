import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const customFontsSize = {
  xl: 2,
  widthMobile: 0.875,
  h1: { regular: 140, adaptiv: '7.3vw' }, //Zeferino One
  h2: { regular: 36, adaptiv: '1.8vw' }, //Raleway
  h3: { regular: 32, adaptiv: '1.6vw' }, //Raleway
  h4: { regular: 24, adaptiv: '1.25vw' }, // Raleway
  h5: { regular: 20, adaptiv: '1.04vw' }, // Raleway
  h6: { regular: 18, adaptiv: '0.86vw' }, // Raleway
  body1: { regular: 16, adaptiv: '0.83vw' }, // Raleway
  body2: { regular: 14, adaptiv: '0.63vw' }, // Raleway
  subtitle1: { regular: 18, adaptiv: '0.86vw' }, //links
  subtitle2: { regular: 14, adaptiv: '0.73vw' }, // Raleway
  button: { regular: 14, adaptiv: '0.73vw' }, // Raleway
  caption: { regular: 30, adaptiv: '1.56vw' }, // Raleway
};

// Create a theme instance.
const theme = createTheme({
  spacing: 1,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1538,
      xxl: 1921,
    },
  },
  palette: {
    fon: {
      main: '#F8F2EA',
      contrastText: '#fff',
    },
    primary: {
      main: '#746449',
      light: '#AEA595',
      dark: '#463D2F',
    },
    secondary: {
      main: '#463D2F',
      light: '#AEA595',
      dark: '#463D2F',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    h1: {
      fontSize: customFontsSize.h1.regular,
      lineHeight: 0.7,
      letterSpacing: '0.02em',
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily:'Zeferino One',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h1.adaptiv,
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.h1.regular/1.25,
      // },
      '@media (max-width:600px)': {
        fontSize: '60px',
      },
    },
    h2: {
      fontSize: customFontsSize.h2.regular,
      lineHeight: 1.2,
      fontWeight: 300,
      fontFamily:'Raleway',
      letterSpacing: '0.015em',
      fontStyle: 'normal',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h2.adaptiv,
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.h2.regular/1.25,
      // },
      '@media (max-width:600px)': {
        fontSize: 18,
      },
    },
    h3: {
      fontSize: customFontsSize.h3.regular,
      lineHeight: 1.4,
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#4F4F4F',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h3.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '24px',
      },
      '@media (mфч-width:600px)': {
        fontSize: '18px',
      },
    },
    h4: {
      fontSize: customFontsSize.h4.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#333333',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h4.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '18px',
      },
      '@media (max-width:600px)': {
        fontSize: '18px',
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.h4.regular/1.25,
      // },
    },

    h5: {
      fontSize: customFontsSize.h5.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      // textTransform: 'uppercase',
      color: '#333',
      

      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h5.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '15px',
      },
      '@media (max-width:600px)': {
        fontSize: '16px',
      },
    },
      
    h6: {
      fontSize: customFontsSize.h6.regular,
      lineHeight: 1.4,
      fontWeight: 600,
      fontStyle: 'normal',
      // textTransform: 'uppercase',
      color: '#4F4F4F',
      scrollbarWidth: 'none',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h6.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '14px',
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.h6.regular/1.25,
      // },
    },
    body1: {
      fontSize: customFontsSize.body1.regular,
      lineHeight: 1.4,
      letterSpacing: '0.015em',
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#4F4F4F',
      scrollbarWidth: 'none',
      fontFamily: ['Raleway', 'sans-serif'].join(','),
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.body1.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '12px',
      },
      '@media (max-width:600px)': {
        fontSize: '10px',
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.body1.regular/1.25,
      // },
    },
    body2: {
      fontSize: customFontsSize.body2.regular,
      lineHeight: 1.4,
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#7C7C7C',
      fontFamily: ['Railway', 'sans-serif'].join(','),
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.body2.adaptiv,
      },
      '@media (max-width:1536px)': {
        fontSize: '12px',
      },
      '@media (max-width:600px)': {
        fontSize: '10px',
      },
      // '@media (-webkit-min-device-pixel-ratio: 1.25)':{
      //   fontSize: customFontsSize.body2.regular/1.25,
      // },
    },
    subtitle1: {
      fontSize: customFontsSize.subtitle1.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#000',
      fontFamily: ['Raleway', 'sans-serif'].join(','),
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.subtitle1.adaptiv,
      },
      '@media (max-width:600px)': {
        fontSize: 14,
      },
    },
    subtitle2: {
      fontSize: customFontsSize.subtitle2.regular,
      lineHeight: 1.4,
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#333333',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.subtitle2.adaptiv,
      },
    },
    button: {
      fontSize: customFontsSize.button.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#333333',
      fontFamily: ['Raleway', 'sans-serif'].join(','),
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.button.adaptiv,
      },
    },
    caption: {
      fontSize: customFontsSize.caption.regular,
      lineHeight: 1.4,
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#333333',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.caption.adaptiv,
      },
    },
    srOnly: {},
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
        },
      },
      variants: [
        // {
        //   props: { variant: 'contained', color: 'primary' },
        //   style: {
        //     border: `4px dashed ${red[500]}`,
        //     backgroundColor: 'red',
        //   },
        // },
      ],
    },
    MuiSnackbarContent: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: '#746449',
          height:'60px',
        },
      },
     
    },
    MuiFormHelperText :{
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize:'12px',
          textTransform:'none'
        },
      },

    }
  },
  
});

export default theme;
