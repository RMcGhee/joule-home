import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
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

let theme = createTheme(themeOptions);

theme = createTheme(theme, {
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.secondary.main}`,
                }
            }
        }
    }
});

export default theme;