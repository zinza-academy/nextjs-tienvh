'use client';
import React from 'react'
import { Grid } from '@mui/material'

import RegistrationResult from '@/pages/dashboard/Lookup/RegistrationResult/page';
import LookupLayout from '@/components/layout/LookupLayout';
import LookupComponent from '@/pages/dashboard/Lookup/page';
function UserResult() {
  return (
    <LookupLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
            <LookupComponent/>
             <RegistrationResult/>
        </Grid>
    </LookupLayout>
  )
}

export default UserResult
