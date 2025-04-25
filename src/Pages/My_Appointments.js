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
import axios from "axios";
// import "./GetAllHotelManager.css";
import { medicalUrl } from "../BaseUrl/BaseUrl";
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
import { merge } from "antd/es/theme/util/statistic";
import MyProfile from "../Page/SuperAdminLogin/MyProfile";

export function My_Appointments() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {
    appointmentlist,
    patientlist,
    MyProfile,
    getappointmentapi,
    appointmentsperday,
  } = React.useContext(AppContext);

  const checkTotalAppointments = () => {
    navigate("/admin/Appointment_List/AppointmentBooking");

    // const today = new Date().toISOString().split("T")[0];

    // const todayAppointments = appointmentlist.filter(
    //   (appointment) => appointment.appointment_date.split("T")[0] === today
    // );

    // if (todayAppointments.length >= appointmentsperday) {
    //   Swal.fire({
    //     title: "Today Appointments are Full",
    //     text: `Appointments per day is ${appointmentsperday}`,
    //     icon: "warning",
    //     confirmButtonColor: "rgb(41, 75, 147)",
    //     showConfirmButton: true,
    //   });
    // } else {
    //   // Proceed to the appointment booking page if slots are available
    // }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const patientdetails = (row) => {
    navigate("Patient_Details", { state: row });
  };
  const getdataList = () => {
    axios
      .get(`${medicalUrl}getAllBooking`)
      .then((response) => {
        setRows(response.data.Details);
        setSearchApiData(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (appointmentlist && patientlist) {
      let mergelist = appointmentlist.map((e) => {
        let finddata = patientlist.find((r) => r._id == e.patientId);
        if (finddata) {
          return { ...e, patientData: finddata };
        } else {
          return null;
        }
      });

      let newdata = mergelist.filter((k) => k.doctorId == MyProfile._id);

      console.log("this is merge list", newdata);
      setRows(newdata);
      setSearchApiData(newdata);
    }
  }, [appointmentlist, patientlist]);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.patientData?.firstName}`.toLowerCase();
        const lastName = `${item.patientData?.lastName}`.toLowerCase();
        const appointment_no = `${item.appointment_no}`.toLowerCase();
        const phone = `${item.patientData?.phoneNo}`;
        const searchValue = event.target.value.toLowerCase();

        return (
          fullName.includes(searchValue) ||
          lastName.includes(searchValue) ||
          appointment_no.includes(searchValue) ||
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

  const showalldetails = (e) => {
    Swal.fire({
      title: "Patient Other Details",
      html: `
        <p><strong>Alternate Phone No:</strong> ${e.patientData?.alternatePhoneNo}</p>
        <p><strong>Email:</strong> ${e.patientData?.email}</p>
      `,
      confirmButtonText: "Close",
    });
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>All Appointment List</div>

            {/* <button
              className="plusiconforadd testimonialposition"
              onClick={checkTotalAppointments} // Attach the validation logic here
            >
              Add Appointment
              <i className="fa-p fa-plus" style={{ color: "black" }}></i>
            </button> */}
          </div>
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
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Appointment No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Phone No
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  Disease
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment Date
                </TableCell>

                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Appointment Time
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Other Details
                </TableCell>

                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  All Details
                </TableCell> */}

                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  Other Details
                </TableCell> */}
                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell align="left">
                        {page * rowsPerPage + i + 1}
                      </TableCell>
                      <TableCell align="left" style={{ textAlign: "center" }}>
                        {row.appointment_no ? row.appointment_no : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.patientData?.firstName
                          ? row.patientData?.firstName
                          : "_"}{" "}
                        {row.patientData?.lastName
                          ? row.patientData?.lastName
                          : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.patientData?.phoneNo
                          ? row.patientData?.phoneNo
                          : "_"}
                      </TableCell>

                      {/* <TableCell align="left">
                        {row.patientData?.diseaseName
                          ? row.patientData?.diseaseName
                          : "_"}
                      </TableCell> */}

                      <TableCell align="left">
                        {row.appointment_date
                          ? moment(row.appointment_date).format("MMMM D, YYYY")
                          : "_"}
                      </TableCell>

                      <TableCell align="left" style={{ textAlign: "center" }}>
                        {row.appointment_time ? row.appointment_time : "_"}
                      </TableCell>

                      <TableCell align="left">
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
                      </TableCell>
                      {/* <TableCell align="left">
                        <button
                          className="btn btn-info"
                          onClick={() => patientdetails(row)}
                        >
                          Info
                        </button>
                      </TableCell> */}

                      {/* <TableCell
                        align="left"
                        style={{
                          color:
                            row.appointment_status === "pending"
                              ? "orange"
                              : row.appointment_status === "confirmed"
                              ? "green"
                              : "red",
                        }} */}
                      {/* > */}
                      {/* {row.appointment_status === 1
                          ? "Confirmed"
                          : row.appointment_status === 2
                          ? "Rejected"
                          : "Pending"} */}

                      {/* {row.appointment_status}
                      </TableCell> */}
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
                      {/* <TableCell align="left">
                        <i
                          className="fa-regular fa-circle-check"
                          onClick={() =>
                            changestatus( row._id, 1)
                          }
                        ></i>
                        <i
                          className="fa-regular fa-circle-xmark"
                          onClick={() =>
                            changestatus( row._id, 2)
                          }
                        ></i>
                      </TableCell> */}
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
