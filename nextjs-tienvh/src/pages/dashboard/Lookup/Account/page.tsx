import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserInfo {
  name: string;
  dob: string;
  gender: number;
  provinceId: number;
  districtId: number;
  wardId: number;
  newPassword: string;
  confirmPassword: string;
}

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


const defaultUserData: UserInfo = {
  name: "Nguyễn Văn A",
  dob: "1990-01-01",
  gender: 1,
  provinceId: 1,
  districtId: 1,
  wardId: 1,
  newPassword: "",
  confirmPassword: "",
};

const personalInfoSchema = yup.object().shape({
  name: yup.string().required("Họ và tên không được để trống"),
  dob: yup.string().required("Ngày sinh không được để trống"),
  gender: yup.number().required("Giới tính không được để trống"),
  provinceId: yup
    .number()
    .required("Tỉnh/Thành phố không được để trống")
    .test("province-check", "Vui lòng chọn Tỉnh/Thành phố", (value) => value !== 0),
  districtId: yup
    .number()
    .required("Quận/Huyện không được để trống")
    .test("district-check", "Vui lòng chọn Quận/Huyện", (value) => value !== 0),
  wardId: yup
    .number()
    .required("Phường/Xã không được để trống")
    .test("ward-check", "Vui lòng chọn Phường/Xã", (value) => value !== 0),
});

const passwordSchema = yup.object().shape({
  newPassword: yup.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
});

function Account() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const { control: personalControl, handleSubmit: handleSubmitPersonal, reset: resetPersonal, watch, setValue, formState: { errors: personalErrors } } = useForm<UserInfo>({
    resolver: yupResolver(personalInfoSchema) as any,
    defaultValues: defaultUserData,
  });

  const { control: passwordControl, handleSubmit: handleSubmitPassword, reset: resetPassword, formState: { errors: passwordErrors } } = useForm<{ newPassword: string, confirmPassword: string }>({
    resolver: yupResolver(passwordSchema) as any,
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const provinceId = watch("provinceId");
  const districtId = watch("districtId");

  useEffect(() => {
    if (provinceId) {
      const selectedProvince = locationData.find(p => p.id === provinceId);
      setDistricts(selectedProvince ? selectedProvince.districts : []);
      if (!districtId) {
        setValue("districtId", 0);
        setValue("wardId", 0);
      }
    } else {
      setDistricts([]);
    }
  }, [provinceId, setValue, districtId]);

  useEffect(() => {
    if (districtId) {
      const selectedDistrict = districts.find(d => d.id === districtId);
      setWards(selectedDistrict ? selectedDistrict.wards : []);
      if (!watch("wardId")) {
        setValue("wardId", 0);
      }
    } else {
      setWards([]);
    }
  }, [districtId, districts, setValue, watch]);

  const onSubmitInfo = handleSubmitPersonal((data) => {
    console.log("User info submitted:", data);
    setSnackbar({ open: true, message: "Thông tin đã được lưu thành công", severity: "success" });
  });

  const onSubmitPassword = handleSubmitPassword((data) => {
    console.log("Password change submitted:", data);
    setSnackbar({ open: true, message: "Mật khẩu đã được thay đổi thành công", severity: "success" });
  });

  const handleResetInfo = () => {
    resetPersonal(defaultUserData);
  };

  const handleResetPassword = () => {
    resetPassword({ newPassword: "", confirmPassword: "" });
  };

  const renderPersonalTextField = (name: keyof UserInfo, label: string, type: string = "text", options: { value: number | string; label: string }[] | null = null) => (
    <Controller
      name={name}
      control={personalControl}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          label={label}
          type={type}
          select={options !== null}
          error={!!personalErrors[name]}
          helperText={personalErrors[name]?.message}
          sx={{
            width: { xs: '100%', sm: '220px' },
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
        >
          {options !== null && [
            <MenuItem key="none" value="" disabled>
              <em>Chọn</em>
            </MenuItem>,
            ...options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ]}
        </TextField>
      )}
    />
  );

  const renderPasswordTextField = (name: "newPassword" | "confirmPassword", label: string) => (
    <Controller
      name={name}
      control={passwordControl}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type="password"
          error={!!passwordErrors[name]}
          helperText={passwordErrors[name]?.message}
          placeholder=""
          InputLabelProps={{
            shrink: true,
            sx: {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
          sx={{
            width: { xs: '100%', sm: '220px' },
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
        />
      )}
    />
  );

  return (
    <Box sx={{ marginX: "36px", display: 'flex', flexDirection: 'column', gap: '45px'}}>
      <form onSubmit={onSubmitInfo}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, marginBottom: "16px", marginTop: "47px" }}>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Thông tin cá nhân
            </Typography>
            <CreateIcon sx={{ opacity: 0.54 }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {renderPersonalTextField("name", "Họ và tên")}
              <Controller
                name="dob"
                control={personalControl}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày sinh"
                      value={dayjs(field.value)}
                      onChange={(newValue) => field.onChange(newValue?.format('YYYY-MM-DD'))}
                      sx={{
                        width: { xs: '100%', sm: '220px' },
                        '& .MuiInputBase-root': {
                          height: '40px',
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {renderPersonalTextField("gender", "Giới tính", "select", [
                { value: 1, label: "Nam" },
                { value: 2, label: "Nữ" },
                { value: 3, label: "Khác" },
              ])}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {renderPersonalTextField("provinceId", "Tỉnh/Thành phố", "select", 
                locationData.map(province => ({ value: province.id, label: province.name }))
              )}
              {renderPersonalTextField("districtId", "Quận/Huyện", "select", 
                districts.map(district => ({ value: district.id, label: district.name }))
              )}
              {renderPersonalTextField("wardId", "Phường/Xã", "select", 
                wards.map(ward => ({ value: ward.id, label: ward.name }))
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginTop: 2 }}>
            <Button
              type="button"
              variant="contained"
              onClick={handleResetInfo}
              sx={{
                fontSize: 16,
                fontWeight: "medium",
                backgroundColor: "#FFFFFF",
                color: "#303F9F",
                width: "auto",
                paddingRight: "16px",
                minHeight: "36px",
                borderRadius: "5px 5px 5px 0",
                "&:hover": {
                  background: "#eeeeee",
                  opacity: "0.9",
                },
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: 16,
                fontWeight: "medium",
                backgroundColor: "#303F9F",
                color: "#FFFFFF",
                width: "auto",
                minHeight: "36px",
                borderRadius: "5px 5px 5px 0",
                "&:hover": {
                  opacity: "0.8",
                },
              }}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </form>

      <form onSubmit={onSubmitPassword}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, marginBottom: "16px", marginTop: "47px" }}>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Mật khẩu
            </Typography>
            <CreateIcon sx={{ opacity: 0.54 }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {renderPasswordTextField("newPassword", "Mật khẩu mới")}
            {renderPasswordTextField("confirmPassword", "Xác nhận lại mật khẩu")}
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button
                type="button"
                variant="contained"
                onClick={handleResetPassword}
                sx={{
                  fontSize: 16,
                  fontWeight: "medium",
                  backgroundColor: "#FFFFFF",
                  color: "#303F9F",
                  mt: 2,
                  width: "auto",
                  paddingRight: "16px",
                  minHeight: "36px",
                  borderRadius: "5px 5px 5px 0",
                  "&:hover": {
                    background: "#eeeeee",
                    opacity: "0.9",
                  },
                }}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontSize: 16,
                  fontWeight: "medium",
                  backgroundColor: "#303F9F",
                  color: "#FFFFFF",
                  mt: 2,
                  width: "auto",
                  minHeight: "36px",
                  borderRadius: "5px 5px 5px 0",
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Account;
