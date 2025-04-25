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
import { medicalUrl } from "../BaseUrl/BaseUrl";

export default function Payment_Status() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {
    patientlist,
    getpatientapi,
    APPOINTMENTNO,
    PATIENTID,
    DOCTORFEES,
    paymentformdata,
  } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedPatientListByDate = [...patientlist].sort(
    (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
  );
  useEffect(() => {
    if (patientlist) {
      setRows(sortedPatientListByDate);
      setSearchApiData(sortedPatientListByDate);
    }
  }, [patientlist]);

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

  const showalldetails = (e) => {
    Swal.fire({
      title: "Client Details",
      html: `
        <p><strong>Full Name:</strong> ${e.fullName}</p>
        <p><strong>Company Name:</strong> ${e.company_Name}</p>
        <p><strong>Email:</strong> ${e.email}</p>
        <p><strong>Phone No.:</strong> ${e.phone_no}</p>
        <p><strong>Service Name:</strong> ${e.service_Name}</p>
        <p><strong>Booking Date:</strong>  ${
          e.dateOfBirth ? moment(e.dateOfBirth).format("MMMM D, YYYY") : "_"
        }</p>

      `,
      confirmButtonText: "Close",
    });
  };

  const changestatus = async (data, bookingid, updatestatus, PATIENTID) => {
    const newStatus = Number(data);

    console.log(bookingid);
    if (newStatus === 0) {
      try {
        let obj = { status: Number(updatestatus) };

        let result = await Swal.fire({
          title: "Do you want to update the status?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        });

        if (result.isConfirmed) {
          if (updatestatus == 1) {
            let timerInterval;
            Swal.fire({
              title: "ESG Certification is sending on client email",
              html: "Process will complete in <b></b> seconds.",
              timer: 30000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${(Swal.getTimerLeft() / 1000).toFixed(
                    0
                  )}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            })
              .then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                }
              })
              .catch((eror) => console.log(eror));
          } else {
            Swal.fire({
              title: "Booking Rejected",
              icon: "success",
            });
          }
          axios
            .post(`${medicalUrl}update_Booking/${bookingid}`, obj)
            .then((resp) => {
              axios
                .get(`${medicalUrl}getAllBooking`)
                .then((response) => {
                  setRows(response.data.Details);
                  setSearchApiData(response.data.Details);
                })
                .catch((eror) => console.log(eror));
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: "Status Updation Failed",
                icon: "error",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } catch (error) {
        Swal.fire({
          title: "Status Updations Failed",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Status already updated",
        icon: "success",
      });
    }
  };

  const contentRef = React.useRef(null);
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToContent();
  }, []);

  const handleSwitchChange = (id) => {
    axios
      .put(`${medicalUrl}/updatePaymentStatus/${id}`)
      .then((response) => {
        getpatientapi();
      })
      .catch((error) => {
        console.error("Status not updating", error);
      });
  };

  const Payment_Update = (id, appointmentno, fees) => {
    console.log("this is patient id");
    console.log(id);
    console.log(appointmentno);
    console.log(fees);
    localStorage.setItem("patientid", JSON.stringify(id));
    localStorage.setItem("appointmentno", JSON.stringify(appointmentno));
    localStorage.setItem("doctorfees", JSON.stringify(fees));

    APPOINTMENTNO(appointmentno);
    PATIENTID(id);
    DOCTORFEES(fees);

    paymentformdata(id, appointmentno, fees);
    let obj = { id: id, appointmentno: appointmentno, fees: fees };

    localStorage.setItem("paymentformdata", JSON.stringify(obj));
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
          Payment Status
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
                  Appointment No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Gender
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Action
                </TableCell>
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
                      <TableCell align="left">
                        {row.firstName ? row.firstName : "_"}{" "}
                        {row.lastName ? row.lastName : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.phone_no ? row.phone_no : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.doctorName ? row.doctorName : "_"}
                      </TableCell>
                      <TableCell align="center">
                        {/* {row.dateOfBirth
                          ? moment(row.dateOfBirth).format("MMMM D, YYYY")
                          : "_"} */}

                        {row.appointmentNo ? row.appointmentNo : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.gender ? row.gender : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.appointmentDate
                          ? moment(row.appointmentDate).format("MMMM D, YYYY")
                          : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.payment_done == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "rgb(196,222,167)" }}
                          >
                            Paid
                          </button>
                        ) : (
                          <NavLink to="./Payment_Update">
                            <button
                              type="button"
                              class="btn btn-primary"
                              style={{ backgroundColor: "red" }}
                              onClick={() =>
                                Payment_Update(
                                  row._id,
                                  row.appointmentNo,
                                  row.fees
                                )
                              }
                            >
                              {" "}
                              Unpaid
                            </button>
                          </NavLink>
                        )}
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
