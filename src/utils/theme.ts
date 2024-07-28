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
            secondary: 'rgba(225, 225, 225, 0.7)'
        },
        primary:{
            main: '#ffffff',
            
        },
        info: {
            main: 'rgba(225, 225, 225, 0.7)'
        },
        divider: '#3a3939'
    },
});