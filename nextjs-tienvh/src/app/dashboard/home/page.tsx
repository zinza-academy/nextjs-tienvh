'use client'
import React, { useState } from 'react';
import { Box } from '@mui/material';

import LineChart from '@/components/common/LineChart';
import SearchItem from '@/components/common/SearchItem';
import HomePageLayout from '@/components/layout/HomePageLayout';
import Summary from '@/components/common/Summary';
const HomePage = () => {
  return (
    <HomePageLayout>
        <Box sx = {{marginTop: `var(--header-height)`}}>
        <Summary />
        </Box>
        <LineChart />
        <SearchItem />
    </HomePageLayout>
   
  );
};

export default HomePage;
