"use client";
import useForgotPassword from "@/api/auth-api/forgot-password.api";
import { Alert, Container, Snackbar, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ForgotPasswordFormData {
  email: string
}

export default function ForgotPasswordForm() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const forgotPasswordMutation = useForgotPassword();
  
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync(data);
      setAlertMessage('Password reset email sent successfully. Please check your email.');
      setAlertSeverity('success');
      setOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to send password reset email';
        setAlertMessage(errorMessage);
      } else {
        setAlertMessage('An unexpected error occurred.');
      }
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
        <Box sx={{ display:'flex', flexDirection: 'row' }}>
          <Typography variant="body1" sx={{ textAlign: "center" }} mb={2}>
            Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{" "}
          </Typography>
          <Typography style={{ color: "red" }}>(*)</Typography>
        </Box>
        <TextField
          fullWidth
          type="email"
          placeholder="Email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", { required: "Email is not empty" })}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ width: "100%", maxWidth: "200px" }}
          >
            <Button
              variant="outlined"
              onClick={() => router.push("/user/login")}
              sx={{
                flexGrow: 1,
                minWidth: "100px",
                color: theme => theme.palette.primary.dark,
                borderColor: theme => theme.palette.primary.dark,
                "&:hover": {
                  opacity: "0.9",
                },
                borderRadius: "8px 8px 8px 0",
              }}
            >
              QUAY LẠI
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || forgotPasswordMutation.isPending || forgotPasswordMutation.isSuccess}
              sx={{
                flexGrow: 1,
                minWidth: "100px",
                backgroundColor: theme => theme.palette.primary.dark,
                "&:hover": {
                  backgroundColor: theme => theme.palette.primary.dark,
                  opacity: "0.9",
                },
                borderRadius: "8px 8px 8px 0",
              }}
            >
               GỬI
            </Button>
          </Stack>
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
