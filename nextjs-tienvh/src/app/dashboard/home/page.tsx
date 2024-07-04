'use client'
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import LineChart from '@/components/common/LineChart';
import SearchItem from '@/components/common/SearchItem';
import HomePageLayout from '@/components/layout/HomePageLayout';
import Summary from '@/components/common/Summary';
const HomePage = () => {
  return (
    <HomePageLayout>
        <Grid sx = {{marginTop: `var(--header-height)`}}>
          <Grid sx={{paddingTop: '24px'}}>
          <Summary />
          </Grid>
          
        </Grid>
        <LineChart />
        <SearchItem />
    </HomePageLayout>
   
  );
};

export default HomePage;
