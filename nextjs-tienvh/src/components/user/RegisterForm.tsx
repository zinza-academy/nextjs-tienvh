"use client";
import "@/styles/globals.css";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterCredentials, register as registerUser, clearRegisterState } from '@/redux/slices/RegisterSlice';

const schema = yup.object().shape({
  cmt: yup
    .string()
    .test(
      'len',
      'CMND/CCCD phải có 9 hoặc 12 số',
      (val): boolean => {
        return val !== undefined && (val.length === 9 || val.length === 12);
      }
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
  name: yup
    .string()
    .required("Họ và tên không được để trống"),
  dob: yup
    .date()
    .required("Ngày sinh không được để trống"),
  gender: yup
    .string()
    .required("Giới tính không được để trống"),
  province: yup
    .string()
    .required("Tỉnh/Thành Phố không được để trống"),
  district: yup
    .string()
    .required("Quận/Huyện không được để trống"),
  ward: yup
    .string()
    .required("Xã/Phường không được để trống"),
  });
interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}


const formFields: FormField[] = [
  {
    name: "cmt",
    label: "Số CMND/CCCD",
    type: "text",
    placeholder: "Số CMND/CCCD",
  },
  { name: "email", label: "Email", type: "email", placeholder: "Email" },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Mật khẩu",
  },
  { name: "name", label: "Họ và tên", type: "text", placeholder: "Họ và tên" },
  { name: "dob", label: "Ngày sinh", type: "date", placeholder: "Ngày sinh" },
  
];

const selectFields = [
  {
    name: "gender" as keyof RegisterCredentials,
    label: "Giới tính",
    type: "select",
    placeholder: "Chọn giới tính",
    options: [
      { value: "male", label: "Nam" },
      { value: "female", label: "Nữ" },
      { value: "other", label: "Khác" },
    ],
  },
    {
      name: "province",
      label: "Tỉnh/Thành phố",
      type: "select",
      placeholder: "Tỉnh/Thành phố",
      options: [
        { value: "hanoi", label: "Hà Nội" },
        { value: "hcm", label: "Hồ Chí Minh" },
      ],
    },
    {
      name: "district",
      label: "Quận/Huyện",
      type: "select",
      placeholder: "Quận/huyện",
      options: [
        { value: "district1", label: "Quận 1" },
        { value: "district2", label: "Quận 2" },
      ],
    },
    {
      name: "ward",
      label: "Phường/Xã",
      type: "select",
      placeholder: "Phường/xã",
      options: [
        { value: "ward1", label: "Phường 1" },
        { value: "ward2", label: "Phường 2" },
      ],
    },
  ];

  export default function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { isLoading, error} = useSelector((state: RootState) => state.register);
  
    const {
      register,
      handleSubmit,
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
      } catch (err) {
        
      }
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
              justifyContent: "center",
              flexDirection: "column",
              gap: 3,
              padding: "20px",
              boxSizing: "border-box",
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
    
            {formFields.map((field) => (
          <Box
            key={field.name}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ paddingBottom: "5px" }}>
              {field.label} <span style={{ color: "red" }}>(*)</span>
            </label>
            <TextField
              {...register(field.name as keyof RegisterCredentials)}
              type={field.type}
              placeholder={field.placeholder}
              error={!!errors[field.name as keyof RegisterCredentials]}
              helperText={errors[field.name as keyof RegisterCredentials]?.message}
              FormHelperTextProps={{
                sx: {
                  color: "red",
                  margin: 0,
                  paddingTop: "3px",
                },
              }}
            />
          </Box>
        ))}
            
            {selectFields.map((field) => (
          <Box
            key={field.name}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ paddingBottom: "5px" }}>
              {field.label} <span style={{ color: "red" }}>(*)</span>
            </label>
            <TextField
              select
              {...register(field.name as keyof RegisterCredentials)}
              error={!!errors[field.name as keyof RegisterCredentials]}
              helperText={errors[field.name as keyof RegisterCredentials]?.message}
              FormHelperTextProps={{
                sx: {
                  color: "red",
                  margin: 0,
                  paddingTop: "3px",
                },
              }}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ))}
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
            <Typography sx={{ textAlign: "center" }}>
              Đã có tài khoản? <Button href="/user/login">Đăng nhập</Button>
            </Typography>
          </Box>
        </Container>
      );
    }
