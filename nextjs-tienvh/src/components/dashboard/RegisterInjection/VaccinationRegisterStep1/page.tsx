"use client";
import React from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  styled,
  TypographyProps,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  "& ul": {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    listStyleType: "disc",
  },
  "& li": {
    marginBottom: theme.spacing(1),
    color: "#D32F2F",
  },
}));

interface Step1Props {
  control: any;
  errors: any;
  setValue: any;
  priorityGroups: { id: number; name: string }[];
  bhyt: { id: number; number: string }[];
  jobs: { id: number; name: string }[];
  workPlaces: { id: number; name: string }[];
  locations: { id: number; name: string }[];
  schedules: { id: number; time: string }[];
}

function Step1({ 
  control, 
  errors,
  setValue,
  priorityGroups, 
  bhyt, 
  jobs, 
  workPlaces, 
  locations, 
  schedules 
}: Step1Props) {
  return (
    <>
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
              <Typography sx={{ ml: 2, fontWeight: "bold" }} variant="body1">
                1. Thông tin người đăng kí tiêm
              </Typography>
              <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography sx={{ fontWeight: "regular", paddingBottom: "5px" }}>
                        Nhóm ưu tiên <span style={{ color: "red" }}>(*)</span>
                      </Typography>
                      <FormControl fullWidth error={!!errors.priorityGroup}>
                        <Controller
                          name="priorityGroup"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="priority-group-label"
                              id="priority-group"
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) {
                                  return <span style={{color:'rgb(0,0,0,60%)'}}>Nhóm ưu tiên</span>
                                }
                                const selectedGroup = priorityGroups.find(group => group.id === parseInt(selected));
                                return selectedGroup ? selectedGroup.name : '';
                              }}
                            >
                              <MenuItem value="" disabled>
                                <span style={{color:'rgb(0,0,0,60%)'}}>Nhóm ưu tiên</span>
                              </MenuItem>
                              {priorityGroups.map((group) => (
                                <MenuItem key={group.id} value={group.id}>
                                  {group.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.priorityGroup && (
                          <Typography color="error" variant="caption">
                            {errors.priorityGroup.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Số thẻ BHYT
                    </Typography>
                    <FormControl fullWidth>
                    <Controller
                      name="bhyt"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="bhyt-label"
                          id="bhyt"
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) return <span style={{color:'rgb(0,0,0,60%)'}}>Số thẻ bảo hiểm y tế</span>;
                            const selectedBHYT = bhyt.find(item => item.id === parseInt(selected));
                            return selectedBHYT ? selectedBHYT.number : "";
                          }}
                        >
                          <MenuItem value="" disabled>
                            <span style={{color:'rgb(0,0,0,60%)'}}>Số thẻ bảo hiểm y tế</span>
                          </MenuItem>
                          {bhyt.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.number}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Grid 2 */}
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Nghề nghiệp
                    </Typography>
                    <FormControl fullWidth>
                    <Controller
                      name="job"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="job-label"
                          id="job"
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) return <span style={{color:'rgb(0,0,0,60%)'}}>Nghề nghiệp</span>;
                            const selectedJob = jobs.find(job => job.id === parseInt(selected));
                            return selectedJob ? selectedJob.name : "";
                          }}
                        >
                          <MenuItem value="" disabled>
                            <span style={{color:'rgb(0,0,0,60%)'}}>Nghề nghiệp</span>
                          </MenuItem>
                          {jobs.map((job) => (
                            <MenuItem key={job.id} value={job.id}>
                              {job.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Đơn vị công tác
                    </Typography>
                    <FormControl fullWidth>
                    <Controller
                      name="workplace"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="workplace-label"
                          id="workplace"
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) return <span style={{color:'rgb(0,0,0,60%)'}}>Đơn vị công tác</span>;
                            const selectedWorkplace = workPlaces.find(place => place.id === parseInt(selected));
                            return selectedWorkplace ? selectedWorkplace.name : "";
                          }}
                        >
                          <MenuItem value="" disabled>
                            <span style={{color:'rgb(0,0,0,60%)'}}>Đơn vị công tác</span>
                          </MenuItem>
                          {workPlaces.map((place) => (
                            <MenuItem key={place.id} value={place.id}>
                              {place.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Địa chỉ hiện tại
                    </Typography>
                    <FormControl fullWidth>
                    <Controller
                      name="location"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="location-label"
                          id="location"
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) return <span style={{color:'rgb(0,0,0,60%)'}}>Địa chỉ hiện tại</span>;
                            const selectedLocation = locations.find(loc => loc.id === parseInt(selected));
                            return selectedLocation ? selectedLocation.name : "";
                          }}
                        >
                          <MenuItem value="" disabled>
                            <span style={{color:'rgb(0,0,0,60%)'}}>Địa chỉ hiện tại</span>
                          </MenuItem>
                          {locations.map((location) => (
                            <MenuItem key={location.id} value={location.id}>
                              {location.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Grid 3 */}
              <Typography
                sx={{ ml: 2, mt: 3, fontWeight: "bold" }}
                variant="body1"
              >
                2. Thông tin đăng kí tiêm chủng
              </Typography>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Ngày muốn được tiêm (dự kiến)
                    </Typography>
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
                    <Typography
                      sx={{ fontWeight: "regular", paddingBottom: "5px" }}
                    >
                      Buổi tiêm mong muốn
                    </Typography>
                    <FormControl fullWidth>
                    <Controller
                      name="schedule"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="schedule-label"
                          id="schedule"
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) return <span style={{color:'rgb(0,0,0,60%)'}}>Buổi tiêm mong muốn</span>;
                            const selectedSchedule = schedules.find(sch => sch.id === parseInt(selected));
                            return selectedSchedule ? selectedSchedule.time : "";
                          }}
                        >
                          <MenuItem value="" disabled>
                            <span style={{color:'rgb(0,0,0,60%)'}}>Buổi tiêm mong muốn</span>
                          </MenuItem>
                          {schedules.map((schedule) => (
                            <MenuItem key={schedule.id} value={schedule.id}>
                              {schedule.time}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography
                      sx={{ fontWeight: "medium", color: "#D32F2F", mt: 2 }}
                    >
                      Lưu ý:
                    </Typography>
                    <StyledTypography
                      component="ul"
                      sx={{
                        mt: 2,
                        fontWeight: "regular",
                        color: "#D32F2F",
                        paddingX: "16px",
                      }}
                    >
                      <li>
                        Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho
                        chiến dịch tiêm chủng Vắc xin COVID - 19
                      </li>
                      <li>
                        Xin vui lòng kiểm tra kỹ các thông tin bắt buộc (VD: Họ
                        và tên, Ngày tháng năm sinh, Số điện thoại, Số
                        CMND/CCCD/Mã định danh công dân/HC ...)
                      </li>
                      <li>
                        Bằng việc nhấn nút xác nhận, bạn hoàn toàn hiểu và đồng
                        ý chịu trách nhiệm với các thông tin đã cung cấp.
                      </li>
                      <li>
                        Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được
                        đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch
                        tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt.
                        Trân trọng cảm ơn!
                      </li>
                    </StyledTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

        </Container>
      </Box>
    </>
  )
}

export default Step1
