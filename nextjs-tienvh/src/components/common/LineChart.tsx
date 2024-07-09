import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['21/09', '22/09', '23/09', '24/09', '25/09', '26/09', '27/09', '28/09', '29/09', '30/09', '01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10', '08/10', '09/10', '10/10', '11/10', '12/10', '13/10', '14/10', '15/10', '16/10', '17/10', '18/10', '19/10', '20/1'],
    datasets: [
      {
        label: 'Đã tiêm',
        data: [600000, 450000, 600000, 750000, 780000, 800000, 850000, 860000, 1000000, 1050000, 720000, 1380000, 1180000, 1080000, 1300000, 1180000, 1480000, 1100000, 1200000, 920000, 1180000, 1240000, 1540000, 1280000, 1520000, 1520000, 1600000, 2060000, 1820000, 1990000],
        borderColor: '#263896',
        backgroundColor: '#263896', 
        pointBorderColor: '#ee0033', 
        pointBackgroundColor: '#ee0033', 
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Box
      sx={{width:'auto', height: '594px',marginX: '36px',paddingX: '16px', paddingY: '24px', marginTop: '88px',borderRadius: '16px',
         boxShadow: 'none',
        '&': {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'
        }}}>
      <Box sx={{paddingTop: '24px', marginBottom: '4px', height: '510px', border: '1px solid #ee0033'}}>
        <Line options={options} data={data} />
      </Box>
      <Typography variant= 'h6'>Dữ liệu tiêm theo ngày</Typography>
    </Box>
  );
};

export default LineChart;
