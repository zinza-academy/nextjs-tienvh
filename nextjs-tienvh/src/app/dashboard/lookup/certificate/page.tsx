'use client';
import React from 'react'
import { Grid } from '@mui/material'
import LookupLayout from '@/components/layout/LookupLayout';
import LookupComponent from '@/components/dashboard/Lookup/page';
import Certificate from '@/components/dashboard/Lookup/Certificate/page';
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
