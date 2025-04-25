import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
// import "./GetAllHotelManager.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { AppContext, AppProvider } from "../context";

export function Confirmed_Appointments() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {
    todayappointment,
    APPOINTMENTDATA,
    patientlist,
    confirmedpatientlist,
  } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [patient, setPatient] = useState([]);
  useEffect(() => {
    if (confirmedpatientlist) {
      setRows(confirmedpatientlist);
      setSearchApiData(confirmedpatientlist);

      console.log(confirmedpatientlist);
    }

    if (patientlist) {
      setPatient(patientlist);
    }
  }, [todayappointment, patientlist, confirmedpatientlist]);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.patient_name}`.toLowerCase();
        const phone = `${item.phone_no}`;
        const searchValue = event.target.value.toLowerCase();

        return fullName.includes(searchValue) || phone.includes(searchValue);
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  const contentRef = React.useRef(null);
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToContent();
  }, []);

  const todaytopatient = (data) => {
    console.log(data);
    APPOINTMENTDATA(data);
    localStorage.setItem("appointmentdata", JSON.stringify(data));
  };
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
            class="fa-solid fa-circle-arrow-up bottomtotop  "
            onClick={scrollToContent}
          ></i>
          Confirmed Appointments
        </Typography>
        <NavLink to="AppointmentBooking">
          {/* <button className="plusiconforadd testimonialposition"> Add Patient <i class="fa-p fa-plus" style={{color:"black"}}></i> </button> */}
        </NavLink>
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
                  Phone No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Disease
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Status
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  Other Details
                </TableCell> */}
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.bookingId}
                    >
                      <TableCell align="left">
                        {page * rowsPerPage + i + 1}
                      </TableCell>
                      <TableCell align="left">
                        {row.patient_name ? row.patient_name : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.phone_no ? row.phone_no : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.disease_name ? row.disease_name : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.appointment_date
                          ? moment(row.appointment_date).format("MMMM D, YYYY")
                          : "_"}
                      </TableCell>

                      <TableCell align="left" style={{ textAlign: "center" }}>
                        {row.appointment_no ? row.appointment_no : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {/* {row.status === 0
                          ? "Pending"
                          : row.status === 1
                          ? "Approved"
                          : "Rejected"} */}

                        {row.appointment_status}
                      </TableCell>
                      {/* <TableCell align="left">
                        <Stack
                          spacing={2}
                          direction="row"
                          style={{ justifyContent: "center" }}
                        >
                          <i
                            className="fa-solid fa-circle-info"
                            style={{
                              fontSize: "20px",
                              color: "#294B93",
                              cursor: "pointer",
                            }}
                            onClick={() => showalldetails(row)}
                          ></i>
                        </Stack>
                      </TableCell> */}
                      <TableCell align="left">
                        <NavLink
                          className={"todaybutton"}
                          // to={"Patient_Registration"}
                          // onClick={() => todaytopatient(row)}
                        >
                          {patient.find(
                            (e) => e.appointmentNo == row.appointment_no
                          ) ? (
                            <button type="button" class="btn btn-primary">
                              Patient Added
                            </button>
                          ) : (
                            <NavLink
                              to={"Patient_Registration"}
                              onClick={() => todaytopatient(row)}
                            >
                              <button
                                type="button"
                                class="btn btn-primary"
                                style={{ backgroundColor: "red" }}
                              >
                                {" "}
                                Add to Patient
                              </button>
                            </NavLink>
                          )}
                        </NavLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          class="pagination"
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
