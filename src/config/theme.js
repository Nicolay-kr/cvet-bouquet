import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const customFontsSize = {
  xl: 2,
  widthMobile: 0.875,
  h1: { regular: 140, adaptiv: '7.3vw' }, //Zeferino One
  h2: { regular: 40, adaptiv: '1.8vw' }, //Raleway
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

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1538,
    xxl: 1921,
  }
};

// Create a theme instance.
const theme = createTheme({
  spacing: 1,
  breakpoints: breakpoints,
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
      'Zeferino One',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),

    h1: {
      fontFamily:'Zeferino One',
      fontSize: customFontsSize.h1.regular,
      lineHeight: 0.7,
      letterSpacing: '0.02em',
      fontWeight: 400,
      fontStyle: 'normal',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h1.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '105px',
      },
      '@media (max-width:600px)': {
        fontSize: '60px',
      },
    },
    h2: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.h2.regular,
      lineHeight: 1.2,
      fontWeight: 300,
      letterSpacing: '0.015em',
      fontStyle: 'normal',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h2.adaptiv,
      },
      
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '32px',
      },
      '@media (max-width:600px)': {
        fontSize: 18,
      },
    },
    h3: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.h3.regular,
      lineHeight: 1.4,
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#000000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h3.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '24px',
      },
      '@media (max-width:600px)': {
        fontSize: '18px',
      },
    },
    h4: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.h4.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#000000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h4.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '18px',
      },
      '@media (max-width:600px)': {
        fontSize: '18px',
      },
    },

    h5: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.h5.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#333',
      

      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h5.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '15px',
      },
      '@media (max-width:600px)': {
        fontSize: '16px',
      },
    },
      
    h6: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.h6.regular,
      lineHeight: 1.4,
      fontStyle: 'normal',
      color: '#000000',
      scrollbarWidth: 'none',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.h6.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '14px',
      },
    },
    body1: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.body1.regular,
      lineHeight: 1.4,
      letterSpacing: '0.015em',
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#000000',
      scrollbarWidth: 'none',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.body1.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '12px',
      },
      '@media (max-width:600px)': {
        fontSize: '10px',
      },
    },
    body2: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.body2.regular,
      lineHeight: 1.4,
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#7C7C7C',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.body2.adaptiv,
      },
      [`@media (max-width:${breakpoints.xl}px)`]: {
        fontSize: '12px',
      },
      '@media (max-width:600px)': {
        fontSize: '10px',
      },
    },
    subtitle1: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.subtitle1.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      color: '#000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.subtitle1.adaptiv,
      },
      '@media (max-width:600px)': {
        fontSize: 14,
      },
    },
    subtitle2: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.subtitle2.regular,
      lineHeight: 1.4,
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#000000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.subtitle2.adaptiv,
      },
    },
    button: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.button.regular,
      lineHeight: 1.4,
      fontWeight: 500,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#000000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.button.adaptiv,
      },
    },
    caption: {
      fontFamily:'Raleway',
      fontSize: customFontsSize.caption.regular,
      lineHeight: 1.4,
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      color: '#000000',
      '@media (min-width:1921px)': {
        fontSize: customFontsSize.caption.adaptiv,
      },
    },
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
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        input: {
          // Some CSS
          fontSize: '18px',
          [`@media (max-width:${breakpoints.xl}px)`]: {
            fontSize: '14px',
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        notchedOutline : {
          '& legend':{
            fontSize: '0.9em',
            [`@media (max-width:${breakpoints.xl}px)`]: {
              fontSize: '1.1em',
            },
            '@media (max-width:600px)': {
              fontSize: '1.4em',
            },
            '@media (min-width:2000px)': {
              fontSize: '0.6em',  
            },
          }
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '18px !important',
          [`@media (max-width:${breakpoints.xl}px)`]: {
            fontSize: '14px',
          },
          '@media (max-width:600px)': {
            fontSize: '12px',
          },
        },
      },
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
