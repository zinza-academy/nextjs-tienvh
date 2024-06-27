"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import theme from "@/lib/theme";

interface ForgotPasswordFormData {
  email: string
}

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = data => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Fake request
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
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <Typography variant="body1" sx={{ textAlign: "center" }} mb={2}>
          Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký{" "}
          <span style={{ color: "red" }}>(*)</span>
        </Typography>
        <TextField
          fullWidth
          type="email"
          placeholder="Email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", { required: "Email không được để trống" })}
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
              disabled={!isValid || isSubmitting}
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
    </Container>
  );
}
