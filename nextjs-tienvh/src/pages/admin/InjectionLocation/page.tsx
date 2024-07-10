import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Divider,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

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

interface InjectionLocation {
  id: number;
  name: string;
  address: string;
  manager: string;
  tables: number;
}

const generateFakeData = (count: number): InjectionLocation[] => {
  const data: InjectionLocation[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `Điểm tiêm ${i}`,
      address: `${i * 100} Đường ${String.fromCharCode(65 + (i % 26))}, Quận ${
        (i % 10) + 1
      }, TP. Hồ Chí Minh`,
      manager: `Quản lý ${i}`,
      tables: (i % 5) + 1,
    });
  }
  return data;
};

const fakeInjectionLocation: InjectionLocation[] = generateFakeData(100);

const VaccineLocation = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      vaccinationPoint: "",
      address: "",
    },
  });

  const [results, setResults] = useState<InjectionLocation[]>(
    fakeInjectionLocation
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLocation, setSelectedLocation] =
    useState<InjectionLocation | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [fullWidth, setFullWidth] = React.useState(true);
  const handleRowClick = (location: InjectionLocation) => {
    setSelectedLocation(location);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLocation(null);
  };

  const handleUpdateLocation = (updatedLocation: InjectionLocation) => {
    setResults((prevResults) =>
      prevResults.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location
      )
    );
    handleCloseDialog();
  };

  const onSubmit = (data: { vaccinationPoint: string; address: string }) => {
    const { vaccinationPoint, address } = data;
    console.log(data);
    const filteredResults = fakeInjectionLocation.filter((point) => {
      return (
        (vaccinationPoint === "" ||
          point.name.toLowerCase().includes(vaccinationPoint.toLowerCase())) &&
        (address === "" ||
          point.address.toLowerCase().includes(address.toLowerCase()))
      );
    });

    setResults(filteredResults);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        marginX: "36px",
        marginTop: "42px",
        minHeight: "638px",
        borderRadius: "16px",
        boxShadow: "none",
        "&": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box sx={{ marginX: "12px" }}>
        <Typography variant="h6" sx={{ paddingX: "10px", paddingY: "16px" }}>
          Tra cứu điểm tiêm
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            paddingBottom: "16px",
          }}
        >
          <Controller
            name="vaccinationPoint"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Điểm tiêm"
                sx={{ width: "260px", minWidth: "130px" }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Địa chỉ"
                sx={{ width: "260px", minWidth: "130px" }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ minWidth: "148px", background: "#171a88" }}
          >
            <SearchIcon />
            Tìm kiếm
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Divider
            sx={{ height: "2px", flex: 1, backgroundColor: "#EEEEEE" }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ marginY: "12px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="vaccination points table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">STT</StyledTableCell>
                <StyledTableCell align="center">Tên điểm tiêm</StyledTableCell>
                <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                <StyledTableCell align="center">
                  Người đứng đầu cơ sở tiêm chủng
                </StyledTableCell>
                <StyledTableCell align="center">Số bàn tiêm</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.manager}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tables}
                    </StyledTableCell>
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle>Cập nhật điểm tiêm</DialogTitle>
          <DialogContent>
            {selectedLocation && (
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
              >
                <TextField
                  label="Tên điểm tiêm"
                  defaultValue={selectedLocation.name}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      name: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Địa chỉ"
                  defaultValue={selectedLocation.address}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      address: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Người quản lý"
                  defaultValue={selectedLocation.manager}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      manager: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Số bàn tiêm"
                  type="number"
                  defaultValue={selectedLocation.tables}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      tables: parseInt(e.target.value),
                    })
                  }
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button
              onClick={() =>
                selectedLocation && handleUpdateLocation(selectedLocation)
              }
            >
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VaccineLocation;
