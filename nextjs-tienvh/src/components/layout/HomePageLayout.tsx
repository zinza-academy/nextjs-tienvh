import { ReactNode } from 'react';
import { Box } from '@mui/material';
import AppBar from '../dashboard/Appbar/page';
import Footer from '../dashboard/Footer/page';
interface HomePageLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: HomePageLayoutProps) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background:'#ffffff'}}>
      <Box sx ={{paddingBottom:'24px'}}>
      <AppBar/>
      </Box>
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer/>
    </Box>
  );
}
