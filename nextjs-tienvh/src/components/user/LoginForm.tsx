"use client";
import '@/styles/globals.css'
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setIsSubmitting } from '@/redux/slices/InputSlice';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isSubmitting } = useSelector((state: RootState) => state.input);
  const router = useRouter();

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid || isSubmitting) return;

    dispatch(setIsSubmitting(true));
    setTimeout(() => {
      dispatch(setIsSubmitting(false));
      router.push('/user');
    }, 2000);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRegisterClick = () => {
    router.push('/user/register');
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: '20px'
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, padding: '20px', boxSizing: 'border-box'}}>
        <Typography variant="h4" sx={{ fontWeight:'bold'}} mb={3}>
          Đăng nhập vào tài khoản
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <label style={{paddingBottom: '5px'}}>Email</label>
          <TextField
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={handleEmailChange}
            error={formSubmitted && email.trim() === ''}
            helperText={formSubmitted && email.trim() === '' ? "Email không được để trống" : ""}
            FormHelperTextProps={{
              sx: {
                color: 'red',
                margin: 0,
                paddingTop: '3px'
              },
            }}
          />
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <label style={{paddingBottom: '5px'}}>Mật khẩu</label>
          <TextField
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={handlePasswordChange}
            error={formSubmitted && password.trim() === ''}
            helperText={formSubmitted && password.trim() === '' ? "Mật khẩu không được để trống" : ""}
            FormHelperTextProps={{
              sx: {
                color: 'red',
                margin: 0,
                paddingTop: '3px'
              },
            }}
          />
        </Box>
        
        <Link className="forgot-pass" href="/user/forgot-password">Quên mật khẩu?</Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            backgroundColor: "#66bb6a",
            height: '50px',
            "&:hover": {
              backgroundColor: "#66bb6a",
              opacity: 0.9,
            },
          }}
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        <Typography sx={{textAlign: 'center'}}>
          Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
        </Typography>

        <Button
          variant="outlined"
          onClick={handleRegisterClick}
          fullWidth
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#9ccc65',
            borderColor: "#9ccc65",
            height: '50px',
            marginTop: '100px',
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          Đăng ký
        </Button>
      </Box>
    </Container>
  );
}