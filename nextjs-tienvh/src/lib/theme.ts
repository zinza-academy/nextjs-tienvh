"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '6rem',
      fontWeight: 'light',
      letterSpacing: '-0.6px'
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 'light',
      letterSpacing: '-0.6px',
      textTransform: 'uppercase'
    },
    h3: {
      fontSize: '3rem',
      letterSpacing: '-0.2px',
      textTransform: 'uppercase'
    },
    h4: {
      fontSize: '2.125rem',
      textTransform: 'uppercase'
    },
    h5: {
      fontSize: '1.5rem',
      textTransform: 'uppercase'
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 'medium',
      letterSpacing: '-0.05px',
      textTransform: 'uppercase'
    },
    body1: {
      fontSize: '1rem',
      letterSpacing:'-0.04px'
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing:'-0.04px'
    },
    subtitle1: {
      fontSize: '1rem',
      letterSpacing:'-0.04px'
    },
    subtitle2: {
      fontSize: '0.875rem',
      letterSpacing:'-0.05px',
      fontWeight:'medium'
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing:'0.33px'
    },
    overline: {
      fontSize: '0.75rem',
      letterSpacing:'-0.04px',
      textTransform: 'uppercase'
    }

  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
