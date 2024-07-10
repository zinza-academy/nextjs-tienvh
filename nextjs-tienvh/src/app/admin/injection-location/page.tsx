'use client';
import React from 'react'
import { Grid } from '@mui/material'
import AdminComponent from '@/pages/admin/page';
import HomePageLayout from '@/components/layout/HomePageLayout';
import VaccineLocation from '@/pages/admin/InjectionLocation/page';
function InjectionLocation() {
  return (
    <HomePageLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
              <AdminComponent/>
              <VaccineLocation/>
        </Grid>
    </HomePageLayout>
  )
}

export default InjectionLocation;
