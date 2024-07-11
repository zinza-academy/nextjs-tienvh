'use client';
import React from 'react'
import { Grid } from '@mui/material'
import AdminComponent from '@/pages/admin/page';
import HomePageLayout from '@/components/layout/HomePageLayout';
import ApproveRegistration from '@/pages/admin/Registration/page';
function Registration() {
  return (
    <HomePageLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
              <AdminComponent/>
              <ApproveRegistration/>
        </Grid>
    </HomePageLayout>
  )
}

export default Registration;
