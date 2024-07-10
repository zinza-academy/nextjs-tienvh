import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Divider } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import locationData, { District, Ward } from './FakeData';


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

//Fake data
const generateFakeData = (count: number): VaccinationPoint[] => {
  const data: VaccinationPoint[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `Điểm tiêm ${i}`,
      streetAddress: `${i * 100} Đường ${String.fromCharCode(65 + (i % 26))}`,
      wardId: (i % 3) + 1,
      districtId: (i % 2) + 1,
      provinceId: (i % 2) + 1,
      manager: `Quản lý ${i}`,
      tables: (i % 5) + 1
    });
  }
  return data;
};


const fakeVaccinationPoints: VaccinationPoint[] = generateFakeData(100);

interface VaccinationPoint {
  id: number;
  name: string;
  streetAddress: string;
  wardId: number;
  districtId: number;
  provinceId: number;
  manager: string;
  tables: number;
}

const VaccinationLookup = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      province: '',
      district: '',
      ward: '',
    }
  });

  const provinceId = useWatch({ control, name: 'province' });
  const districtId = useWatch({ control, name: 'district' });

  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [results, setResults] = useState<VaccinationPoint[]>(fakeVaccinationPoints);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (provinceId) {
      const selectedProvince = locationData.find(p => p.id === parseInt(provinceId));
      setDistricts(selectedProvince ? selectedProvince.districts : []);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      const selectedDistrict = locationData
        .find(p => p.id === parseInt(provinceId))
        ?.districts.find(d => d.id === parseInt(districtId));
      setWards(selectedDistrict ? selectedDistrict.wards : []);
    } else {
      setWards([]);
    }
  }, [districtId, provinceId]);

  const onSubmit = (data: { province: string; district: string; ward: string }) => {
    const { province, district, ward } = data;
  
    const filteredResults = fakeVaccinationPoints.filter((point) => {
      return (!province || point.provinceId === parseInt(province)) &&
             (!district || point.districtId === parseInt(district)) &&
             (!ward || point.wardId === parseInt(ward));
    });
  
    setResults(filteredResults);
    setPage(0);
  };
  

  const getLocationNameFromData = (type: 'province' | 'district' | 'ward', id: number): string => {
    switch (type) {
      case 'province':
        return locationData.find(p => p.id === id)?.name || '';
      case 'district':
        for (const province of locationData) {
          const district = province.districts.find(d => d.id === id);
          if (district) return district.name;
        }
        return '';
      case 'ward':
        for (const province of locationData) {
          for (const district of province.districts) {
            const ward = district.wards.find(w => w.id === id);
            if (ward) return ward.name;
          }
        }
        return '';
      default:
        return '';
    }
  };
  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
              {locationData.map((province) => (
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
              sx={{width: '260px',minWidth: '130px'}} disabled={!provinceId}>
              <MenuItem value="">Chọn huyện</MenuItem>
              {districts.map((district) => (
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
              sx={{width: '260px',minWidth: '130px'}} disabled={!districtId}>
              <MenuItem value="">Chọn xã</MenuItem>
              {wards.map((ward) => (
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
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align='center'>{page * rowsPerPage + index + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{row.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.streetAddress}</StyledTableCell>
                  <StyledTableCell align='center'>{getLocationNameFromData('ward', row.wardId)}</StyledTableCell>
                  <StyledTableCell align='center'>{getLocationNameFromData('district', row.districtId)}</StyledTableCell>
                  <StyledTableCell align='center'>{getLocationNameFromData('province', row.provinceId)}</StyledTableCell>
                  <StyledTableCell align='center'>{row.manager}</StyledTableCell>
                  <StyledTableCell align='center'>{row.tables}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={results.length}
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
