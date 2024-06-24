import { Box, Button, Container, Input, Stack, Typography, colors } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';

const ForgotPassword = () => {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', minHeight: '100vh' }}>
      
      {/* Side left */}
      <Box sx={{ flex: 1, textAlign: 'center'}}>
      <Image 
          src="/img/image_1.png"
          alt = "image"
          width={500}
          height={700}
          objectFit='cover'
        />
      </Box>

      {/* Phần bên phải */}
      <Container sx={{ flex: 1, textAlign: 'center', maxWidth: '400px' }}>
        <Typography sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
          Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{' '}
          <span style={{ color: 'red' }}>(*)</span>
        </Typography>
        
        <OutlinedInput
          placeholder="Email"
          sx={{
            '&::placeholder': { color: 'grey' }
          }}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />

        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="outlined">Quay lại</Button>
          <Button variant="contained">Gửi</Button>
        </Stack>
      </Container>
      
    </Container>
  );
};
export default ForgotPassword