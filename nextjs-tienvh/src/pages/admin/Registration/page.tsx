
import React, { useState } from 'react'
import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RegistrationRow } from '@/components/common/FakeData';
import { ApprovalStatus } from '@/components/common/enum';
import { Controller, useForm } from 'react-hook-form';


const initialRows: RegistrationRow[] = [
  {
    stt: 1,
    hovaten: "Nguyễn Văn A",
    ngaysinh: "01/01/1980",
    gioitinh: "Nam",
    sochungminh: "0123456789",
    trangthai: ApprovalStatus.PendingApproval,
  },
  {
    stt: 2,
    hovaten: "Trần Thị B",
    ngaysinh: "02/02/1990",
    gioitinh: "Nữ",
    sochungminh: "9876543210",
    trangthai: ApprovalStatus.PendingApproval,
  },
];

function ApproveRegistration() {
  const [rows, setRows] = useState<RegistrationRow[]>(initialRows);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      idNumber: "",
    },
  });

  const onSubmit = (data: { name: string; idNumber: string }) => {
    const { name, idNumber } = data;
    const filteredRows = initialRows.filter((row) =>
      row.hovaten.toLowerCase().includes(name.toLowerCase()) &&
      row.sochungminh.includes(idNumber)
    );
    setRows(filteredRows);
  };

  const handleStatusChange = (stt: number, newStatus: ApprovalStatus) => {
    setRows(rows.map(row => 
      row.stt === stt ? { ...row, trangthai: newStatus } : row
    ));
  };

  return (
    <Box sx={{paddingTop:'48px', marginX:'36px'}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Họ và tên" sx={{ width: '260px', minWidth: '130px' }} />
          )}
        />
        <Controller
          name="idNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Số CMND/CCCD" sx={{ width: '260px', minWidth: '130px' }} />
          )}
        />
        <Button type="submit" variant="contained" sx={{ minWidth: '148px', background: "#171a88" }}>
          <SearchIcon />
          Tìm kiếm
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="vaccination table">
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
              <TableRow key={row.stt}>
                <TableCell component="th" scope="row" align="center">{row.stt}</TableCell>
                <TableCell align="center">{row.hovaten}</TableCell>
                <TableCell align="center">{row.ngaysinh}</TableCell>
                <TableCell align="center">{row.gioitinh}</TableCell>
                <TableCell align="center">{row.sochungminh}</TableCell>
                <TableCell align="center">
                  <FormControl fullWidth>
                    <Select
                      value={row.trangthai}
                      onChange={(e) => handleStatusChange(row.stt, e.target.value as ApprovalStatus)}
                      sx={{ height: 'auto', borderRadius: '30px', background: '#E8EAF6', color: '#000000' }}
                    >
                      <MenuItem value={ApprovalStatus.PendingApproval}>Chờ phê duyệt</MenuItem>
                      <MenuItem value={ApprovalStatus.Approved}>Phê duyệt</MenuItem>
                      <MenuItem value={ApprovalStatus.Rejected}>Không phê duyệt</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


export default ApproveRegistration
