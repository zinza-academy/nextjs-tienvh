'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, Container, FormControl, Grid, MenuItem, Select, Typography, TextField, styled, TypographyProps,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StepperItem from '@/components/common/StepperItem';
import EastIcon from "@mui/icons-material/East";
import WestIcon from '@mui/icons-material/West';

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  '& ul': {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    listStyleType: 'disc',
  },
  '& li': {
    marginBottom: theme.spacing(1),
    color: '#D32F2F',
  },
}));
function RegisterInjection() {
  const { control } = useForm();
  const handleSearch = () =>{

  }
  // Fake data for selects
  const priorityGroups = [
    { id: 1, name: "Nhóm ưu tiên 1" },
    { id: 2, name: "Nhóm ưu tiên 2" },
    { id: 3, name: "Nhóm ưu tiên 3" },
  ];

  const jobs = [
    { id: 1, name: "Bác sĩ" },
    { id: 2, name: "Y tá" },
    { id: 3, name: "Công nhân" },
  ];

  const workPlaces = [
    { id: 1, name: "Bệnh viện A" },
    { id: 2, name: "Cơ quan B" },
    { id: 3, name: "Xí nghiệp C" },
  ];

  const locations = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "TP.HCM" },
    { id: 3, name: "Đà Nẵng" },
  ];

  return (
    <>
    <StepperItem/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Grid 1 */}
            <Typography sx= {{ml: 2,  fontWeight:'bold'}} variant="body1" >1. Thông tin người đăng kí tiêm</Typography>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                <Typography sx={{ fontWeight: 'regular', paddingBottom:'5px'}}>Nhóm ưu tiên <span style={{color:'red'}}>(*)</span></Typography>
                  <FormControl fullWidth>
                    <Select labelId="priority-group-label" id="priority-group" placeholder="Nhóm ưu tiên" defaultValue="">
                      {priorityGroups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Số thẻ BHYT</Typography>
                  <FormControl fullWidth>
                    <Select labelId="bhyt-label" id="bhyt" placeholder="Số thẻ BHYT" defaultValue="">
                      <MenuItem value="123456789">123456789</MenuItem>
                      <MenuItem value="987654321">987654321</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Grid 2 */}
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Nghề nghiệp</Typography>
                  <FormControl fullWidth>
                    <Select labelId="job-label" id="job" placeholder="Nghề nghiệp" defaultValue="">
                      {jobs.map((job) => (
                        <MenuItem key={job.id} value={job.id}>
                          {job.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Đơn vị công tác</Typography>
                  <FormControl fullWidth>
                    <Select labelId="workplace-label" id="workplace" placeholder="Đơn vị công tác" defaultValue="">
                      {workPlaces.map((place) => (
                        <MenuItem key={place.id} value={place.id}>
                          {place.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Địa chỉ hiện tại</Typography>
                  <FormControl fullWidth>
                    <Select labelId="location-label" id="location" placeholder="Địa chỉ hiện tại" defaultValue="">{locations.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          {location.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Grid 3 */}
            <Typography sx={{ml: 2, mt: 3, fontWeight:'bold'}} variant="body1" >2. Thông tin đăng kí tiêm chủng</Typography>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Ngày muốn được tiêm (dự kiến)</Typography>
                  <FormControl fullWidth>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                        />
                      </LocalizationProvider>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography sx={{ fontWeight: 'regular' , paddingBottom:'5px'}}>Buổi tiêm mong muốn</Typography>
                  <FormControl fullWidth>
                    <Select labelId="session-label" id="session" placeholder="Buổi tiêm mong muốn" defaultValue="">
                      <MenuItem value="Sáng">Sáng</MenuItem>
                      <MenuItem value="Chiều">Chiều</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={12}>
                <Typography sx={{ fontWeight: 'medium', color: '#D32F2F', mt:2 }}>Lưu ý:</Typography>
                <StyledTypography component="ul" sx={{ mt: 2, fontWeight: 'regular', color: '#D32F2F' , paddingX:'16px'}}>
                  <li>Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19</li>
                  <li>Xin vui lòng kiểm tra kỹ các thông tin bắt buộc (VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)</li>
                  <li>Bằng việc nhấn nút xác nhận, bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp.</li>
                  <li>Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!</li>
                </StyledTypography>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} md={12} mb={4}>
                <Grid container spacing={2} justifyContent="center" sx={{marginTop:'24px'}}>
                  <Grid item xs={12} sm={3} md={1.3}>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: 16,
                        fontWeight: "medium",
                        backgroundColor: "#FFFFFF",
                        color: "#303F9F",
                        mt: 2,
                        width: "100%",
                        height: 36,
                        borderRadius: "5px 5px 5px 0",
                        "&:hover": {
                          backgroundColor: "#303F9F",
                          color: "#FFFFFF",
                          opacity:'0.7'
                        },
                      }}
                    >
                      <WestIcon  sx={{mr: 2}}/>
                        Hủy bỏ
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={1.3}>
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{
                        fontSize: 16,
                        fontWeight: "medium",
                        backgroundColor: "#303F9F",
                        color: "#FFFFFF",
                        mt: 2,
                        width: "100%",
                        height: 36,
                        borderRadius: "5px 5px 5px 0",
                        "&:hover": {
                          backgroundColor: "#cccccc",
                          color: "#303F9F",
                          opacity:'0.8'
                        },
                      }}
                    >
                      Tiếp tục <EastIcon sx={{ ml: 2 }} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
      </Container>
      </Box>
    </>
  )
}

export default RegisterInjection
