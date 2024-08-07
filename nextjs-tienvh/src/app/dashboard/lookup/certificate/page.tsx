'use client';
import React from 'react'
import { Grid } from '@mui/material'
import LookupLayout from '@/components/layout/LookupLayout';
import LookupComponent from '@/pages/dashboard/Lookup/page';
import Certificate from '@/pages/dashboard/Lookup/Certificate/page';
function Lookup() {
  return (
    <LookupLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
              <LookupComponent/>
              <Certificate/>
        </Grid>
    </LookupLayout>
  )
}

export default Lookup
