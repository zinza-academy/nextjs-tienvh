import React from 'react';
import { Grid, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface StepperItemProps {
  step: number;
}

function StepperItem({ step }: StepperItemProps) {
  const steps = [
    'Thông tin cá nhân',
    'Phiếu đồng ý tiêm',
    'Hoàn thành',
  ];

  return (
    <Grid>
      <Grid sx={{background: '#f5f5f5', height: '64px'}}>
        <Typography variant='h5' style={{padding: '12.33px 36px', fontSize:'28px'}}>Tra cứu đăng ký tiêm</Typography>
      </Grid>
      <Grid sx={{paddingY: '80px', textAlign:'center', display:'flex', justifyContent:'center'}}>
        <Stepper activeStep={step} alternativeLabel sx={{width: '604px', marginY:'8px'}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}

export default StepperItem;
