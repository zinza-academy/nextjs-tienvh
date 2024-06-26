'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/material';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string,
  password: string
}
export default  function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  });

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
      <Box component="form" sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, padding: '20px', boxSizing: 'border-box'}}>
        <Typography variant="h4" sx={{ fontWeight:'bold'}} mb={3}>
          Đăng nhập vào tài khoản
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <label style={{paddingBottom: '5px'}}>Email</label>
          <TextField
            type="email"
            placeholder="Nhập email của bạn"
          />
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <label style={{paddingBottom: '5px'}}>Mật khẩu</label>
          <TextField
            type="password"
            placeholder="Nhập mật khẩu của bạn"
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


