import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FeaturedVideo from "@mui/icons-material/FeaturedVideo";
const rows = [
  {
    muiso: 1,
    thoigiantiem: "08/09/2021 - 16:56",
    tenvacxin: "COVID-19 Vaccine AstraZeneca",
    solo: "NJ0342",
    noitiem: "Lémin",
  },
  {
    muiso: 2,
    thoigiantiem: "05/09/2021 - 16:56",
    tenvacxin: "COVID-19 Vaccine AstraZeneca",
    solo: "NJ0343",
    noitiem: "TYT Dịch Vọng Hậu",
  },
];
const numberOfShots = rows.length;
const cardBackgroundColor = numberOfShots >= 2 ? "#43A047" : "#D2CC27";
function Certificate() {
  return (
    
    <Container>
      <Grid container spacing={2} mt={"47px"}>
        {/* Certificate */}
        <Grid item xs={12} md={9.2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="body1">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                Độc lập - Tự do - Hạnh phúc
              </Typography>
            </Box>
            <Typography variant="h5">CHỨNG NHẬN TIÊM CHỦNG COVID-19</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography>Họ và tên</Typography>
                <Typography style={{ fontWeight: 500 }}>
                  Nguyễn Văn A
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography>Ngày sinh</Typography>
                <Typography style={{ fontWeight: 500 }}>16/10/1994</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography style={{ fontWeight: 500 }}>
                  Số CMND/CCCD
                </Typography>
                <Typography>030012345679</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography>Số thẻ BHYT</Typography>
                <Typography style={{ fontWeight: 500 }}>
                  030094005102
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography>Địa chỉ</Typography>
              <Typography style={{ fontWeight: 500 }}>
                Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội
              </Typography>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography>Kết luận</Typography>
              <Typography style={{ fontWeight: 500 }}>
                Đã được tiêm phòng vắc xin phòng bệnh Covid-19
              </Typography>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="vaccination table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Mũi số
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Thời gian tiêm
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Tên vắc xin
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Số lô
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Nơi tiêm
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.muiso}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.muiso}
                        </TableCell>
                        <TableCell align="center">{row.thoigiantiem}</TableCell>
                        <TableCell align="center">{row.tenvacxin}</TableCell>
                        <TableCell align="center">{row.solo}</TableCell>
                        <TableCell align="center">{row.noitiem}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Grid item xs={12} sm={12} md={12}>
              <Button
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
                Đăng ký mũi tiêm tiếp theo
              </Button>
            </Grid>
          </Box>
        </Grid>

        {/* Card */}
        <Grid item xs={12} md={2.8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              background: cardBackgroundColor, 
              height: "100%",
              justifyContent: "space-between",
              borderRadius: '8px'
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              sx={{ height: "100%", p: 2 }}
            >
              <Grid item sx={{ width: "50%", maxWidth:'50px' }}>
                <Image
                  src="/img/1384271893.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Grid>

              <Grid item>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: '#ffffff',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                }}
              >
                {numberOfShots >= 2 ? "ĐÃ TIÊM 2 MŨI VẮC XIN" : "ĐÃ TIÊM 1 MŨI VẮC XIN"}
              </Typography>
              </Grid>
              <Grid item sx={{ width: "70%", maxWidth: "100px" }}>
                <Image
                  src="/img/frame_1.png"
                  alt="qr"
                  width={196}
                  height={196}
                  layout="responsive"
                />
              </Grid>
              <Grid
                item
                container
                sx={{ background: "#ffffff", width: "100%", borderRadius:'8px' }}
              >
                <Grid item container alignItems="center" sx={{ p: 1 }}>
                  <Grid item xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2">Họ và tên</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      Nguyễn Văn A
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container alignItems="center" sx={{ p: 1 }}>
                  <Grid item xs={2}>
                    <DateRangeIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2">Ngày sinh</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      16/10/1994
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container alignItems="center" sx={{ p: 1 }}>
                  <Grid item xs={2}>
                    <FeaturedVideo />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2">Số CMND/CCCD</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      030012345678
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Certificate;
