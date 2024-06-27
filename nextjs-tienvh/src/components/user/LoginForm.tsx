'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/material';
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import {Link as MuiLink} from '@mui/material';
import NextLink from 'next/link';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/^\S*$/, "Mật khẩu không được chứa dấu cách"),
});

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
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    //Fake request
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/user/login");
    }, 2000);
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
      <Box component="form"  onSubmit={handleSubmit(onSubmit)}  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, padding: '20px', boxSizing: 'border-box'}}>
        <Typography variant="h4" sx={{ fontWeight:'bold'}} mb={3}>
          Đăng nhập vào tài khoản
        </Typography>

        <Box  sx={{display: 'flex', flexDirection: 'column'}}>
          <label style={{paddingBottom: '5px'}}>Email</label>
          <TextField
            type="email"
            placeholder="Nhập email của bạn"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            autoComplete="email"
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
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            autoComplete="current-password"
            FormHelperTextProps={{
              sx: {
                color: 'red',
                margin: 0,
                paddingTop: '3px'
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MuiLink
            component={NextLink}
            href="/user/forgot-password"
            variant="body2"
            sx={{
              display: 'inline-block',
              color: (theme) => theme.palette.info.light,
              '&:hover': { color: '#1E88E5' },
              textDecoration: 'none'
            }}
          >
            Quên mật khẩu?
          </MuiLink>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isValid || isSubmitting}
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
