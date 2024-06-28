"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { AppDispatch, RootState } from "@/lib/store";
import {
  RegisterCredentials,
  register as registerUser,
  clearRegisterState,
} from "@/redux/slices/RegisterSlice";

const schema = yup.object().shape({
  cmt: yup
    .string()
    .test(
      "len",
      "CMND/CCCD phải có 9 hoặc 12 số",
      (val): boolean =>
        val !== undefined && (val.length === 9 || val.length === 12)
    )
    .matches(/^[0-9]+$/, "CMND/CCCD chỉ được chứa số")
    .required("CMND/CCCD không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/^\S*$/, "Mật khẩu không được chứa dấu cách"),
  name: yup.string().required("Họ và tên không được để trống"),
  dob: yup.string().required("Ngày sinh không được để trống"),
  gender: yup.string().required("Giới tính không được để trống"),
  province: yup.string().required("Tỉnh/Thành Phố không được để trống"),
  district: yup.string().required("Quận/Huyện không được để trống"),
  ward: yup.string().required("Xã/Phường không được để trống"),
});

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.register
  );
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {
    dispatch(clearRegisterState());
    try {
      await dispatch(registerUser(data)).unwrap();
      setOpen(true);
      setTimeout(() => {
        router.push("/user/login");
      }, 1000);
    } catch (err) {}
  };

  const renderFormField = (
    name: keyof RegisterCredentials,
    label: string,
    type: string = "text",
    placeholder: string,
    options?: { value: string; label: string }[]
  ) => {
    const commonProps = {
      placeholder,
      margin: "normal",
      error: !!errors[name],
      helperText: errors[name]?.message,
      ...register(name),
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <label style={{ paddingBottom: "5px" }}>
          {label}
          <span style={{ color: "red" }}>(*)</span>
        </label>
        {type === "select" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                {...field}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              >
                {options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        ) : type === "date" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors[name],
                      helperText: errors[name]?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        ) : (
          <TextField
            type={type}
            fullWidth
            placeholder={placeholder}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        )}
      </Box>
    );
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
          mb={3}
        >
          Đăng ký tài khoản
        </Typography>

        {renderFormField("cmt", "Số CMND/CCCD", "text", "Số CMND/CCCD")}
        {renderFormField("email", "Email", "email", "Nhập email của bạn")}
        {renderFormField(
          "password",
          "Mật khẩu",
          "password",
          "Nhập mật khẩu của bạn"
        )}
        {renderFormField("name", "Họ và tên", "text", "Nhập họ và tên")}
        {renderFormField("dob", "Ngày sinh", "date", "Chọn ngày sinh")}
        {renderFormField("gender", "Giới tính", "select", "Chọn giới tính", [
          { value: "male", label: "Nam" },
          { value: "female", label: "Nữ" },
          { value: "other", label: "Khác" },
        ])}
        {renderFormField(
          "province",
          "Tỉnh/Thành phố",
          "select",
          "Tỉnh/Thành phố",
          [
            { value: "hanoi", label: "Hà Nội" },
            { value: "hcm", label: "Hồ Chí Minh" },
            { value: "danang", label: "Đà Nẵng" },
            { value: "cantho", label: "Cần Thơ" },
          ]
        )}
        {renderFormField("district", "Quận/Huyện", "select", "Quận/Huyện", [
          { value: "district1", label: "Quận 1" },
          { value: "district2", label: "Quận 2" },
          { value: "district3", label: "Quận 3" },
          { value: "district4", label: "Quận 4" },
        ])}
        {renderFormField("ward", "Xã/Phường", "select", "Xã/Phường", [
          { value: "ward1", label: "Phường 1" },
          { value: "ward2", label: "Phường 2" },
          { value: "ward3", label: "Phường 3" },
          { value: "ward4", label: "Phường 4" },
        ])}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || !isValid}
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            backgroundColor: "#66bb6a",
            height: "50px",
            "&:hover": {
              backgroundColor: "#66bb6a",
              opacity: 0.9,
            },
          }}
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Đăng ký thành công!
          </Alert>
        </Snackbar>

        <Typography sx={{ textAlign: "center" }}>
          Đã có tài khoản? <Button href="/user/login">Đăng nhập</Button>
        </Typography>
      </Box>
    </Container>
  );
}
