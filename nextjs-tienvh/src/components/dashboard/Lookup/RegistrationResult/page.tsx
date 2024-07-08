import React from 'react'
import { Box, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const rows = [
  {
    stt: 1,
    hovaten: "Nguyễn Văn A",
    ngaysinh: "01/01/1980",
    gioitinh: "Nam",
    sochungminh: "0123456789",
    trangthai: "Đăng ký thành công",
  },
  {
    stt: 2,
    hovaten: "Trần Thị B",
    ngaysinh: "02/02/1990",
    gioitinh: "Nữ",
    sochungminh: "9876543210",
    trangthai: "Đăng ký thành công",
  },
];

function RegistrationResult() {
  return (
    <Box sx={{paddingTop:'48px', marginX:'36px'}}>
      <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 350 }} aria-label="vaccination table">
          <TableHead>
          <TableRow sx={{ backgroundColor: "#eeeeee" }}>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '5%' }}>STT</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '19%' }}>Họ và tên</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '19%' }}>Ngày sinh</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '19%' }}>Giới tính</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '19%' }}>Số CMND/CCCD/Mã định danh công dân</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: '19%' }}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.stt} >
                <TableCell component="th" scope="row" align="center">{row.stt}</TableCell>
                <TableCell align="center">{row.hovaten}</TableCell>
                <TableCell align="center">{row.ngaysinh}</TableCell>
                <TableCell align="center">{row.gioitinh}</TableCell>
                <TableCell align="center">{row.sochungminh}</TableCell>
                <TableCell align="center" >
                  <Button sx={{ border:'1px solid', borderRadius:'30px', background:'#E8EAF6', color: '#000000', height:'auto', marginY:'12px',paddingY:'0px 4px', width:'100%'}}>
                  {row.trangthai}
                  </Button>
                  
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RegistrationResult
