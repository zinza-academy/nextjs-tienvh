'use client'
import React, { useState } from 'react';
import { Box } from '@mui/material';
import AppBar from '@/components/dashboard/Appbar/page';
import Footer from '@/components/dashboard/Footer/page';
import Summary from '@/components/dashboard/Summary/page';
import LineChart from '@/components/common/LineChart';
import SearchItem from '@/components/common/SearchItem';

const HomePage = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background:'#ffffff'}}>
     
      <AppBar/>
      <Box sx={{ flex: 1 }}>
        <Summary />
        <LineChart />
        <SearchItem />
      </Box>
      <Footer/>
    </Box>
  );
};

export default HomePage;
