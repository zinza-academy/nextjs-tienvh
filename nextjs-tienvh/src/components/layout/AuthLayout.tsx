import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import BackgroundImage from '@/components/common/BackgroundImage';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <BackgroundImage />
      </Grid>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  );
}