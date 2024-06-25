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
import { setIsSubmitting } from "@/redux/slices/InputSlice";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
  {
    name: "gender",
    label: "Giới tính",
    type: "text",
    placeholder: "Giới tính",
  }
  
];

const selectFields = [
    {
      name: "city",
      label: "Tỉnh/Thành phố",
      type: "select",
      placeholder: "Tỉnh/Thành phố",
      options: [
        { value: "hanoi", label: "Hà Nội" },
        { value: "hcm", label: "Hồ Chí Minh" },
        // Add more cities as needed
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
        // Add more districts as needed
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
        // Add more wards as needed
      ],
    },
  ];

  export default function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { isSubmitting } = useSelector((state: RootState) => state.input);
    const router = useRouter();
  
    const validateForm = () => {
      let newErrors: Record<string, string> = {};
      let isValid = true;
  
      [...formFields, ...selectFields].forEach((field) => {
        if (!formData[field.name]?.trim()) {
          newErrors[field.name] = `${field.label} không được để trống`;
          isValid = false;
        }
      });
  
      setErrors(newErrors);
      return isValid;
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm() && !isSubmitting) {
        dispatch(setIsSubmitting(true));
        // Xử lý gửi form ở đây
        setTimeout(() => {
          dispatch(setIsSubmitting(false));
          router.push("/user");
        }, 2000);
      }
    };
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Xóa lỗi khi người dùng bắt đầu nhập
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
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
            onSubmit={handleSubmit}
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
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
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
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
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
              disabled={isSubmitting}
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
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
    
            <Typography sx={{ textAlign: "center" }}>
              Đã có tài khoản? <Button href="/user/login">Đăng nhập</Button>
            </Typography>
          </Box>
        </Container>
      );
    }
