"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

type Ward = {
  id: number;
  name: string;
};
type District = {
  id: number;
  name: string;
  provinceId: number;
  wards: Ward[];
};
type Province = {
  id: number;
  name: string;
  districts: District[];
};

type LocationData = Province[];
const locationData: LocationData = [
  {
    id: 1,
    name: "Hà Nội",
    districts: [
      {
        id: 1,
        name: "Ba Đình",
        provinceId: 1,
        wards: [
          { id: 1, name: "Phúc Xá" },
          { id: 2, name: "Trúc Bạch" },
          { id: 3, name: "Vĩnh Phúc" },
        ],
      },
      {
        id: 2,
        name: "Cầu Giấy",
        provinceId: 1,
        wards: [
          { id: 1, name: "Nghĩa Đô" },
          { id: 2, name: "Nghĩa Tân" },
          { id: 3, name: "Mai Dịch" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Hồ Chí Minh",
    districts: [
      {
        id: 1,
        name: "Quận 1",
        provinceId: 2,
        wards: [
          { id: 1, name: "Bến Nghé" },
          { id: 2, name: "Bến Thành" },
          { id: 3, name: "Cầu Kho" },
        ],
      },
      {
        id: 2,
        name: "Quận 2",
        provinceId: 2,
        wards: [
          { id: 1, name: "An Phú" },
          { id: 2, name: "Thảo Điền" },
          { id: 3, name: "Bình An" },
        ],
      },
    ],
  },
];
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
  province: yup
  .number()
  .required("Tỉnh/Thành Phố không được để trống")
  .test("province-check", "Vui lòng chọn Tỉnh/Thành Phố", (value) => value !== undefined && value !== 0),
district: yup
  .number()
  .required("Quận/Huyện không được để trống")
  .test("district-check", "Vui lòng chọn Quận/Huyện", (value) => value !== undefined && value !== 0),
ward: yup
  .number()
  .required("Xã/Phường không được để trống")
  .test("ward-check", "Vui lòng chọn Xã/Phường", (value) => value !== undefined && value !== 0),
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
    resetField,
    formState: { errors, isValid },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const selectedProvince = useWatch<RegisterCredentials, "province">({
    control,
    name: "province",
  });

  const selectedDistrict = useWatch<RegisterCredentials, "district">({
    control,
    name: "district",
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

  const handleProvinceChange = (provinceId: number | undefined) => {
    resetField("district", { defaultValue: undefined });
    resetField("ward", { defaultValue: undefined });
  };
  
  const handleDistrictChange = (districtId: number | undefined) => {
    resetField("ward", { defaultValue: undefined });
  };

  const renderFormField = (
    name: keyof RegisterCredentials,
    label: string,
    type: string = "text",
    placeholder: string,
    options?: { value: number; label: string }[]
  ) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
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
              value={field.value || ""}
              onChange={(e) => {
                const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                field.onChange(value);
                if (name === "province" && typeof value === 'number') handleProvinceChange(value);
                if (name === "district" && typeof value === 'number') handleDistrictChange(value);
              }}
              error={!!errors[name]}
              helperText={errors[name]?.message}
            >
              <MenuItem value="">
                {placeholder}
              </MenuItem>
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
          { value: 1, label: "Nam" },
          { value: 2, label: "Nữ" },
          { value: 3, label: "Khác" },
        ])}

        {renderFormField(
          "province",
          "Tỉnh/Thành phố",
          "select",
          "Chọn Tỉnh/Thành phố",
          locationData.map((province) => ({
            value: province.id,
            label: province.name,
          }))
        )}

        {renderFormField(
          "district",
          "Quận/Huyện",
          "select",
          "Chọn Quận/Huyện",
          selectedProvince
            ? locationData
                .find((province) => province.id === selectedProvince)
                ?.districts.map((district) => ({
                  value: district.id,
                  label: district.name,
                })) || []
            : []
        )}

        {renderFormField(
          "ward",
          "Xã/Phường",
          "select",
          "Chọn Xã/Phường",
          selectedDistrict && selectedProvince
            ? locationData
                .find((province) => province.id === selectedProvince)
                ?.districts.find((district) => district.id === selectedDistrict)
                ?.wards.map((ward) => ({
                  value: ward.id,
                  label: ward.name,
                })) || []
            : []
        )}
        
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
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}

        <Typography sx={{ textAlign: "center" }}>
          Đã có tài khoản? <Button href="/user/login">Đăng nhập</Button>
        </Typography>
      </Box>
    </Container>
  );
}
