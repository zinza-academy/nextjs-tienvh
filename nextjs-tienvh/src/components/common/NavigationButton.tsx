
import React from 'react';
import { Grid, Button } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

function NavigationButtons({ onBack, onContinue, isFirstStep, isLastStep }: NavigationButtonsProps) {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: "24px" }}>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            fontSize: 16,
            fontWeight: "medium",
            backgroundColor: "#FFFFFF",
            color: "#303F9F",
            mt: 2,
            paddingRight: "16px",
            width: "100%",
            minHeight: "36px",
            borderRadius: "5px 5px 5px 0",
            "&:hover": {
              background: "#eeeeee",
              opacity: "0.9",
            },
          }}
        >
          <WestIcon sx={{ mr: 2 }} />
          {isFirstStep ? 'Hủy bỏ' : 'Quay lại'}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          onClick={onContinue}
          variant="contained"
          sx={{
            fontSize: 16,
            fontWeight: "medium",
            backgroundColor: "#303F9F",
            color: "#FFFFFF",
            mt: 2,
            width: "100%",
            minHeight: "36px",
            borderRadius: "5px 5px 5px 0",
            "&:hover": {
              opacity: "0.8",
            },
          }}
        >
          {isLastStep ? 'Hoàn thành' : 'Tiếp tục'} <EastIcon sx={{ ml: 2 }} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default NavigationButtons;
