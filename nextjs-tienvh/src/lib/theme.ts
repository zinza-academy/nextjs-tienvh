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
  },
  palette: {
    primary: {
      main: '#2d2188',
      dark: '#303f9f'
    },
    warning: {
      main: '#c65312',
      light: '#af8612'
    },
    info: {
      main: '#0593cf',
      light: '#3949ab'
    },
    success: {
      main: '#00884f',
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          height: '64px', // Thiết lập chiều cao cho Tabs
        },
        indicator: {
          backgroundColor: 'rgb(0,0,0,87%)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 120, 
          marginRight: 16, 
          fontSize: 16, 
          color:'#6e6d7a',
          '&.Mui-selected': {
            color: 'rgb(0,0,0)',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disableScrollLock: true,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red',
          margin: 0,
          paddingTop: '3px',
        },
      },
    },

  },
});

export default theme;
