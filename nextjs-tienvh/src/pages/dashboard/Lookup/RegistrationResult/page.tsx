import React, { useEffect, useState } from 'react'
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
import { RegistrationRow } from '@/components/common/FakeData';
import { ApprovalStatus } from '@/components/common/enum';

const getLabelFromApprovalStatus = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.PendingApproval:
      return "Chờ phê duyệt";
    case ApprovalStatus.Approved:
      return "Đăng ký thành công";
    case ApprovalStatus.Rejected:
      return "Không phê duyệt";
    default:
      return "";
  }
}

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

const loadData = (): RegistrationRow[] => {
  return initialRows;
};

function RegistrationResult() {
  const [rows, setRows] = useState<RegistrationRow[]>([]);

  useEffect(() => {
    const loadedData = loadData();
    setRows(loadedData);
  }, []);

  return (
    <Box sx={{paddingTop:'48px', marginX:'36px'}}>
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
                  <Button disabled sx={{
                    border: '1px solid',
                    borderRadius: '30px',
                    background: '#E8EAF6',
                    color: '#000000',
                    height: 'auto',
                    marginY: '12px',
                    paddingY: '0px 4px',
                    width: '100%',
                    '&.Mui-disabled': {
                      border: '1px solid', 
                      background: '#E8EAF6',
                      color: '#000000',
                    },
                  }}>
                    {getLabelFromApprovalStatus(row.status)}
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

export default RegistrationResult;
