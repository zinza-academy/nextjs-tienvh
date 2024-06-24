"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#1976d2', 
  //     light: '#42a5f5',
  //     dark: '#1565c0',
  //   },
  //   secondary: {
  //     main: '#9c27b0',
  //     light: '#ba68c8',
  //     dark: '#7b1fa2',
  //   },
  //   background: {
  //     default: '#f5f5f5',
  //     paper: '#ffffff',
  //   },
  // },
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
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiOutlinedInput-root': {
    //         borderRadius: 8,
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;