"use client";

import useRegister from "@/api/auth-api/register.api";
import { Gender } from "@/components/common/enum";
import { useLocation } from "@/hooks/useLocation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setError, setLoading, setSuccess } from "@/redux/slices/RegisterSlice";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  cmt: yup
    .string()
    .test(
      "len",
      "Số CMND/CCCD phải có 9 hoặc 12 số",
      (val): boolean =>
        val !== undefined && (val.length === 9 || val.length === 12)
    )
    .matches(/^[0-9]+$/, "Số CMND/CCCD chỉ được chứa số")
    .required("Số CMND/CCCD không được để trống"),
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
  dob: yup.date().required("Ngày sinh không được để trống"),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender) as Gender[])
    .required("Giới tính không được để trống"),
  province_id: yup
    .number()
    .required("Tỉnh/Thành Phố không được để trống")
    .test(
      "province-check",
      "Vui lòng chọn Tỉnh/Thành Phố",
      (value) => value !== undefined && value !== 0
    ),
  district_id: yup
    .number()
    .required("Quận/Huyện không được để trống")
    .test(
      "district-check",
      "Vui lòng chọn Quận/Huyện",
      (value) => value !== undefined && value !== 0
    ),
  ward_id: yup
    .number()
    .required("Xã/Phường không được để trống")
    .test(
      "ward-check",
      "Vui lòng chọn Xã/Phường",
      (value) => value !== undefined && value !== 0
    ),
});

interface RegisterFormData {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: Date;
  gender: Gender;
  province_id: number;
  district_id: number;
  ward_id: number;
}

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector(
    (state) => state.register
  );
  const registerApi = useRegister();
  const [open, setOpen] = useState(false);

  const { provinces, districts, wards, setProvinceId, setDistrictId } =
    useLocation();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      dispatch(setLoading(true));
      await registerApi.mutateAsync(data);
      dispatch(setSuccess(true));
      setOpen(true);
      setTimeout(() => {
        router.push("/user/login");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError("Có lỗi xảy ra khi đăng ký"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleProvinceChange = (provinceId: number | undefined) => {
    setProvinceId(provinceId);
    resetField("district_id", { defaultValue: undefined });
    resetField("ward_id", { defaultValue: undefined });
  };

  const handleDistrictChange = (districtId: number | undefined) => {
    setDistrictId(districtId);
    resetField("ward_id", { defaultValue: undefined });
  };

  const renderFormField = (
    name: keyof RegisterFormData,
    label: string,
    type: string = "text",
    placeholder: string,
    options?: { value: number; label: string }[]
  ) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ paddingBottom: "5px" }}>{label}</Typography>
          <Typography sx={{ color: "red" }}>(*)</Typography>
        </Box>
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
                  const value =
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10);
                  field.onChange(value);
                  if (name === "province_id" && typeof value === "number")
                    handleProvinceChange(value);
                  if (name === "district_id" && typeof value === "number")
                    handleDistrictChange(value);
                }}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              >
                <MenuItem value="">{placeholder}</MenuItem>
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
                  value={field.value || null} 
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
          { value: Gender.MALE, label: "Nam" },
          { value: Gender.FEMALE, label: "Nữ" },
          { value: Gender.OTHER, label: "Khác" },
        ])}

        {renderFormField(
          "province_id",
          "Tỉnh/Thành phố",
          "select",
          "Chọn Tỉnh/Thành phố",
          provinces.data?.map((province) => ({
            value: province.id,
            label: province.name,
          }))
        )}

        {renderFormField(
          "district_id",
          "Quận/Huyện",
          "select",
          "Chọn Quận/Huyện",
          districts.data?.map((district) => ({
            value: district.id,
            label: district.name,
          }))
        )}

        {renderFormField(
          "ward_id",
          "Xã/Phường",
          "select",
          "Chọn Xã/Phường",
          wards.data?.map((ward) => ({
            value: ward.id,
            label: ward.name,
          }))
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

        {success && (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          >
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
              Đăng ký thành công!
            </Alert>
          </Snackbar>
        )}
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
