'use client';
import {ThemeOptions} from "@mui/material";
import { Roboto } from 'next/font/google';
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const theme: ThemeOptions = {
  palette: {
      mode: 'light',
      primary: {
          main: '#ffff00',
      },
      secondary: {
          main: '#ff8400',
      },
      background: {
          default: '#9e9e9e'
      }
      
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
}

export default theme;

