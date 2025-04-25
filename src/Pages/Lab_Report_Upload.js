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
import { useNavigate } from "react-router-dom";
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

export default function Lab_Report_Upload() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {AllBookings}=React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

    if(AllBookings){

      setRows(AllBookings)
      setSearchApiData(AllBookings)

    }



  }, [AllBookings]);

  // const addJobsData = () => {
  //   navigate("/admin/AddHotelManager");
  // };


  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.fullName}`.toLowerCase();

        const phone=`${item.phone_no}`;

        const searchValue = event.target.value.toLowerCase();

        return (
          fullName.includes(searchValue) ||  phone.includes(searchValue )
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
        <p><strong>Booking Date:</strong> ${
          new Date(e.bookingDate).toISOString().split("T")[0]
        }</p>
        <p><strong>Status:</strong> ${
          e.status === 1 ? "Accepted" : e.status === 2 ? "Rejected" : "Pending"
        }</p>
      `,
      confirmButtonText: "Close",
    });
  };

  const changestatus = async (data, bookingid, updatestatus) => {
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

          if(updatestatus==1){


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
                  timer.textContent = `${(Swal.getTimerLeft()/1000).toFixed(0)}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
            }).then((result) => {

              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            }).catch((eror)=>console.log(eror));



            }
            else{


              Swal.fire({
                title: "Booking Rejected",
                icon:"success"
              });



            }
          axios
            .post(
              `${medicalUrl}update_Booking/${bookingid}`,
              obj
            )
            .then((resp) => {




              axios
                .get(`${medicalUrl}getAllBooking`)
                .then((response) => {
                  setRows(response.data.Details);
                  setSearchApiData(response.data.Details);
                }).catch((eror)=>console.log(eror));;







              })
            .catch((error) => {
              console.log(error)
              Swal.fire({
                title: "Status Updation Failed",
                icon:"error"
              });
            });




        }
        else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } catch (error) {
        Swal.fire({
          title: "Status Updations Failed",
          icon:"error"

        });
      }
    } else {
      Swal.fire({
        title: "Status already updated",
        icon:"success"

      });
    }
  };

  const contentRef = React.useRef(null);
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(()=>{
scrollToContent();

  },[])
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
          All Lab Reports
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
                  Other Details
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                 Test Report
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
                        {row.fullName ? row.fullName : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.phone_no ? row.phone_no : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.service_Name ? row.service_Name : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.bookingDate
                          ? moment(row.bookingDate).format("MMMM D, YYYY")
                          : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.status === 0
                          ? "Pending"
                          : row.status === 1
                          ? "Approved"
                          : "Rejected"}
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
                      <TableCell align="left">
                        <i
                          className="fa-regular fa-circle-check"
                          onClick={() =>
                            changestatus(row.status, row.bookingId, 1)
                          }
                        ></i>
                        <i
                          className="fa-regular fa-circle-xmark"
                          onClick={() =>
                            changestatus(row.status, row.bookingId, 2)
                          }
                        ></i>
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
