'use client';
import React from 'react'
import { Grid } from '@mui/material'

import RegistrationResult from '@/components/dashboard/Lookup/RegistrationResult/page';
import LookupLayout from '@/components/layout/LookupLayout';
import LookupComponent from '@/components/dashboard/Lookup/page';
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
