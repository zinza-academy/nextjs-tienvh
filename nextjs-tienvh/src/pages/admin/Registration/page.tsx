import React, { useEffect, useState } from 'react'
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
    id: 1,
    name: "Nguyễn Văn A",
    dob: "01/01/1980",
    gender: "Nam",
    cmt: "0123456789",
    status: ApprovalStatus.PendingApproval,
  },
  {
    id: 2,
    name: "Trần Thị B",
    dob: "02/02/1990",
    gender: "Nữ",
    cmt: "9876543210",
    status: ApprovalStatus.PendingApproval,
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
      row.name.toLowerCase().includes(name.toLowerCase()) &&
      row.cmt.includes(idNumber)
    );
    setRows(filteredRows);
  };

  const handleStatusChange = (id: number, newStatus: ApprovalStatus) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, status: newStatus } : row
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
            {rows.sort((a, b) => a.id - b.id).map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.dob}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.cmt}</TableCell>
                <TableCell align="center">
                  <FormControl fullWidth>
                    <Select
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value as ApprovalStatus)}
                      sx={{ height: 'auto', borderRadius: '30px', background: '#E8EAF6', color: '#000000' }}
                    >
                      <MenuItem value={ApprovalStatus.PendingApproval}>Chờ phê duyệt</MenuItem>
                      <MenuItem value={ApprovalStatus.Approved}>Đăng ký thành công</MenuItem>
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

export default ApproveRegistration;
