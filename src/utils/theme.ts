'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        background: {
            default: '#000000',
            paper: '#121212'
        },
        text: {
            primary: '#ffffff',
            secondary: '#6f6f6f'
        },
        primary:{
            main: '#c243d8',
            dark: 'rgba(194,67,216,0.2)'
            
        },
        secondary: {
            main: '#1f1f1f'
        },
        info: {
            main: 'rgba(225, 225, 225, 0.7)'
        },
        divider: '#3a3939'
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6f6f6f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c243d8',
                    },
                },
            },
        },
    },
});