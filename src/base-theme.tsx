import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#aa00ff',
    },
    secondary: {
      main: '#e91e63',
    },
    background: {
        default: '#000000', // Set the default background color to black
    },
  },
};

export const theme = createTheme(themeOptions);