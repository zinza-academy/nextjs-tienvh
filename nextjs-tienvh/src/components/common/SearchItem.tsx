import { useVaccination } from '@/api/vaccination-site/search-item.api';
import { useLocation } from '@/hooks/useLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, colors, Divider, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VaccinationLookup = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      province: '',
      district: '',
      ward: '',
    }
  });

  const { provinces, districts, wards, setProvinceId, setDistrictId } = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [wardId, setWardId] = useState<number | null>(null);

  const { data: vaccinationData, isLoading, error, refetch } = useVaccination({
    page: page + 1,
    pageSize: rowsPerPage,
    ward_id: wardId,
  });

  const watchProvince = watch('province');
  const watchDistrict = watch('district');

  useEffect(() => {
    if (watchProvince) {
      setProvinceId(Number(watchProvince));
    }
  }, [watchProvince, setProvinceId]);

  useEffect(() => {
    if (watchDistrict) {
      setDistrictId(Number(watchDistrict));
    }
  }, [watchDistrict, setDistrictId]);

  const onSubmit = (data: { province: string; district: string; ward: string }) => {
    if (data.ward) {
      setWardId(Number(data.ward));
    } else {
      setWardId(null);
    }
    refetch();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (provinces.isLoading || districts.isLoading || wards.isLoading || isLoading) 
    return <Typography sx={{ margin: '22px 36px' }}>Đang tải...</Typography>;

  return (
    <Box sx={{ marginX: '36px', marginTop:'22px', minHeight: '638px',borderRadius: '16px',
      boxShadow: 'none',
     '&': {
       boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'
     }}}>
      <Box sx = {{marginX: '12px'}}>
      <Typography variant="h6" sx={{paddingX: '10px', paddingY: '16px'}}>Tra cứu điểm tiêm theo địa bàn</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'row', gap: '16px', paddingBottom: '16px'}}>
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <Select {...field} displayEmpty 
              MenuProps={{
                disableScrollLock: true
              }}
              sx={{width: '260px',minWidth: '130px'}}>
              <MenuItem value="">Chọn tỉnh</MenuItem>
              {provinces.data?.map((province) => (
                  <MenuItem key={province.id} value={province.id.toString()}>{province.name}</MenuItem>
                ))}
            </Select>
          )}
        />
        <Controller
          name="district"
          control={control}
          render={({ field }) => (
            <Select {...field} displayEmpty
              MenuProps={{
                disableScrollLock: true
              }}
              sx={{width: '260px',minWidth: '130px'}} disabled={!watchProvince}>
              <MenuItem value="">Chọn huyện</MenuItem>
              {districts.data?.map((district) => (
                  <MenuItem key={district.id} value={district.id.toString()}>{district.name}</MenuItem>
                ))}
            </Select>
          )}
        />
        <Controller
          name="ward"
          control={control}
          render={({ field }) => (
            <Select {...field} displayEmpty 
              MenuProps={{
                disableScrollLock: true
              }}
              sx={{width: '260px',minWidth: '130px'}} disabled={!watchDistrict}>
              <MenuItem value="">Chọn xã</MenuItem>
              {wards.data?.map((ward) => (
                  <MenuItem key={ward.id} value={ward.id.toString()}>{ward.name}</MenuItem>
                ))}
            </Select>
          )}
        />
        <Button type="submit" variant="contained"  sx={{minWidth:'148px', background: "#171a88"}}>
          <SearchIcon/>
          Tìm kiếm
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Divider sx={{ height: '2px', flex: 1, backgroundColor: '#EEEEEE' }} />
      </Box>
      <TableContainer component={Paper} sx={{marginY: '12px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="vaccination points table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align='center'>STT</StyledTableCell>
              <StyledTableCell align='center'>Tên điểm tiêm</StyledTableCell>
              <StyledTableCell align='center'>Số nhà, tên đường</StyledTableCell>
              <StyledTableCell align='center'>Xã/Phường</StyledTableCell>
              <StyledTableCell align='center'>Quận/Huyện</StyledTableCell>
              <StyledTableCell align='center'>Tỉnh/Thành phố</StyledTableCell>
              <StyledTableCell align='center'>Người đứng đầu cơ sở tiêm chủng</StyledTableCell>
              <StyledTableCell align='center'>Số bàn tiêm</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
              {vaccinationData?.data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align='center'>{page * rowsPerPage + index + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{row.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.address}</StyledTableCell>
                  <StyledTableCell align='center'>{row.ward.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.ward.district.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.ward.district.province.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.manager}</StyledTableCell>
                  <StyledTableCell align='center'>{row.table_number}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={vaccinationData?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
     
    </Box>
  );
};

export default VaccinationLookup;

