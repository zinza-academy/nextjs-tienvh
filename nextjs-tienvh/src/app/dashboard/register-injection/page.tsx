'use client';
import React from 'react'
import HomePageLayout from '@/components/layout/HomePageLayout'
import { Grid } from '@mui/material'
import RegisterInjection from '@/components/dashboard/RegisterInjection/page';
function RegisterForInjection() {
  return (
    <HomePageLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
            <RegisterInjection/>
        </Grid>
    </HomePageLayout>
  )
}

export default RegisterForInjection
