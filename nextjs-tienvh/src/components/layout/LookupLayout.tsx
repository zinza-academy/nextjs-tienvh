import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import AppBar from '../dashboard/Appbar/page';
import Footer from '../dashboard/Footer/page';
interface LookupLayoutProps {
  children: ReactNode;
}

export default function LookupLayout({ children }: LookupLayoutProps) {
  return (
    <Grid sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background:'#ffffff'}}>
      <AppBar/>
      <Grid sx={{ flex: 1 }}>
        {children}
      </Grid>
      <Footer/>
    </Grid>
  );
}
