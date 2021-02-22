import { createMuiTheme } from '@material-ui/core/styles';

export const globalTheme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: 'p',
        subtitle2: 'span',
        body1: 'div',
        body2: 'p',
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: '#213a67',
    },
    secondary: {
      main: '#e66d13',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
});
