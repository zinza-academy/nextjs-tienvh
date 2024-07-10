'use client';
import React from 'react'
import { Grid } from '@mui/material'
import LookupLayout from '@/components/layout/LookupLayout';
import LookupComponent from '@/pages/dashboard/Lookup/page';
import Account from '@/pages/dashboard/Lookup/Account/page';
function UserAccount() {
  return (
    <LookupLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
            <LookupComponent/>
             <Account/>
        </Grid>
    </LookupLayout>
  )
}

export default UserAccount
