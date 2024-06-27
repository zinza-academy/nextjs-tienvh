'use client'
import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Backdrop, IconButton, Button  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fetchUser } from '@/redux/slices/UserSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();  
  const { user, isLoading, error } = useSelector((state: RootState) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const router = useRouter();

  const handleLoadUser = () => {
    dispatch(fetchUser());
    setIsUserLoaded(true);
  };

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <Box sx={{ padding: 3 }}>
      <IconButton onClick={handleLoadUser} sx={{ mt: 2 }}>
        <AccountCircleIcon fontSize="large" sx={{ width: '100px', height: '100px'}}/>
      </IconButton>

      {isLoading && (
        <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      
      {isUserLoaded && user && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Xin chào, {user.name}
          </Typography>
          <Typography variant="body1">
            Email: {user.email}
          </Typography>
        </>
      )}

      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Đăng nhập
      </Button>

    </Box>
  );
};

export default HomePage;
