import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { AppContext } from "../context";
import { pdfurl } from "../BaseUrl/BaseUrl";
import moment from "moment";

export default function Lab_Patient_List() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [patient, setPatient] = useState([]);

  const { labpatientlist, patientlist, patientrecord } = useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (patientlist) {
      let lab = patientlist.filter((e) => e.labReportUploaded === "yes");

      if (lab) {
        let newarray = [];

        if (patientrecord) {
          newarray = lab.map((e) => {
            let finddata = patientrecord.find((f) => f.patientId === e._id);
            return {
              ...e,
              laboratory: finddata ? finddata.laboratory : [],
            };
          });

          setRows(newarray);
          setSearchApiData(newarray);
          setPatient(newarray);
        }
      }
    }
  }, [labpatientlist, patientlist, patientrecord]);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.firstName}`.toLowerCase();
        const lastName = `${item.lastName}`.toLowerCase();
        const phone = `${item.phone_no}`;

        const searchValue = event.target.value.toLowerCase();

        return (
          fullName.includes(searchValue) ||
          lastName.includes(searchValue) ||
          phone.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  const openPDF = (filename) => {
    window.open(`${pdfurl}${filename}`, "_blank");
  };

  const contentRef = React.useRef(null);
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToContent();
  }, []);

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
          ref={contentRef}
        >
          <i
            className="fa-solid fa-circle-arrow-up bottomtotop"
            onClick={scrollToContent}
          ></i>
          All Lab Patient List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search"
            id="outlined-size-small"
            size="small"
            value={filterValue}
            onChange={(e) => handleFilter(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {filterValue && (
                    <IconButton onClick={handleClearFilter} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ "white-space": "nowrap" }}>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Phone No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Doctor Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Test Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Test Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Lab Reports
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return row.laboratory.map((labReport, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row._id}-${index}`}
                    >
                      {index === 0 && (
                        <>
                          <TableCell
                            align="left"
                            rowSpan={row.laboratory.length}
                          >
                            {page * rowsPerPage + i + 1}
                          </TableCell>
                          <TableCell
                            align="left"
                            rowSpan={row.laboratory.length}
                          >
                            {row.firstName ? row.firstName : "_"}{" "}
                            {row.lastName ? row.lastName : "_"}
                          </TableCell>
                          <TableCell
                            align="left"
                            rowSpan={row.laboratory.length}
                          >
                            {row.phone_no ? row.phone_no : "_"}
                          </TableCell>
                          <TableCell
                            align="left"
                            rowSpan={row.laboratory.length}
                          >
                            {row.doctorName ? row.doctorName : "_"}
                          </TableCell>
                          <TableCell align="left">
                            {labReport.labTestName}
                          </TableCell>
                          <TableCell align="left">
                            {moment(labReport.labTestDate).format(
                              "MMMM D, YYYY"
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            rowSpan={row.laboratory.length}
                          >
                            {row.appointmentNo ? row.appointmentNo : "_"}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              onClick={() => openPDF(labReport.labReport)}
                              style={{
                                backgroundColor: "rgb(196, 222, 167)",
                                color: "red",
                              }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                      {index !== 0 && (
                        <>
                          <TableCell align="left">
                            {labReport.labTestName}
                          </TableCell>
                          <TableCell align="left">
                            {moment(labReport.labTestDate).format(
                              "MMMM D, YYYY"
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              onClick={() => openPDF(labReport.labReport)}
                              style={{
                                backgroundColor: "rgb(196, 222, 167)",
                                color: "red",
                              }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ));
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
