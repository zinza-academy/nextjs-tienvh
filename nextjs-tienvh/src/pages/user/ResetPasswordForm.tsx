"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import useResetPassword from '@/api/auth-api/reset-password';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Cập nhật schema với xác thực mật khẩu và xác nhận mật khẩu
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/^\S*$/, "Mật khẩu không được chứa dấu cách"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], "Mật khẩu và nhập lại mật khẩu không khớp")
    .required("Nhập lại mật khẩu không được để trống"),
});

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get('token') : null;
  
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  
  const resetPasswordMutation = useResetPassword();
  const onSubmit: SubmitHandler<ResetPasswordFormData> = data => {
    if (token) {
      const variables = {
        password: data.newPassword,
        token: token,
      };

      resetPasswordMutation.mutate(variables, {
        onSuccess: (response) => {
          setAlertMessage('Password reset successful. You can now log in with your new password.');
          setAlertSeverity('success');
          setOpen(true);

          setTimeout(() => {
            router.push('/user/login');
          }, 3000);
        },
        onError: (error: Error) => {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password';
            setAlertMessage(errorMessage);
          } else {
            setAlertMessage('An unexpected error occurred.');
          }
          setAlertSeverity('error');
          setOpen(true);
        }
      });
    } else {
      setAlertMessage('Invalid or missing token.');
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <Typography variant="body1" sx={{ textAlign: "center" }} mb={2}>
          Để đặt lại mật khẩu, vui lòng nhập mật khẩu mới của bạn và xác nhận mật khẩu.
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="New Password"
          margin="normal"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="Confirm Password"
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || resetPasswordMutation.isPending}
            sx={{
              minWidth: "100px",
              backgroundColor: theme => theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme => theme.palette.primary.dark,
                opacity: "0.9",
              },
              borderRadius: "8px",
            }}
          >
            ĐẶT LẠI MẬT KHẨU
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
