"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: { email: any }) => {
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
        <Typography sx={{ fontSize: "16px", textAlign: "center" }} mb={2}>
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
                color: "#303f9f",
                borderColor: "#303f9f",
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
                backgroundColor: "#303f9f",
                "&:hover": {
                  backgroundColor: "#303f9f",
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
