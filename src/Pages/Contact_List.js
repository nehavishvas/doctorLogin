import React, { useContext } from "react";
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
import { Link } from "react-router-dom";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";

export default function Contact_List() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const { AllInquiries } = useContext(AppContext);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.Name}`.toLowerCase();
        // const emailMatches = item.email.toLowerCase();
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return fullName.includes(searchValue);
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };
  // const getdataList = () => {
  // axios
  //   .get(`${}all_inquiries`)
  //   .then((response) => {
  //     console.log(response);
  //     console.log(response.data.Hotels_details);
  //     setRows(response.data.all_inquiries);
  //     setSearchApiData(response.data.all_inquiries);

  // setSearchApiData(response.data.manager_Details);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // };

  useEffect(() => {
    if (AllInquiries) {
      setRows(AllInquiries);
      setSearchApiData(AllInquiries);
    }
  }, [AllInquiries]);

  // const addJobsData = () => {
  //   navigate("/admin/AddHotel");
  // };

  const showalldetails = (e) => {
    Swal.fire({
      title: "Client Details",
      html: `
            <p><strong>Full Name:</strong> ${e.Name}</p>
            <p><strong>Email:</strong> ${e.Email}</p>
            <p><strong>Message:</strong> ${e.Message}</p>

            <p><strong>Status:</strong> ${
              e.status === 0 ? "Pending" : e.status === 1 ? "Solved" : "Pending"
            }</p>
        `,
      confirmButtonText: "Close",
    });
  };

  const changestatus = async (status, id, checkstatus) => {
    if (checkstatus == 0) {
      let result = await Swal.fire({
        title: "Inquiry Solved ?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      });

      if (result.isConfirmed) {
        let obj = { status: Number(status) };

        try {
          axios
            .post(`${medicalUrl}update_inquiry/${id}`, obj)
            .then((resp) => {
              Swal.fire({
                title: "Inquiry Solved Successfully",
                icon: "success",
              });
              axios
                .get(`${medicalUrl}all_inquiries`)
                .then((resp) => {
                  setRows(resp.data.all_inquiries);

                  console.log(resp.data.all_inquiries);
                })
                .catch((error) => {
                  console.log(`our contact ${error}`);
                });
            })
            .catch((error) => {
              console.log(`our contact ${error}`);
            });
        } catch {
          Swal.fire({
            title: "Status Updation Failed",
            icon: "error",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Inquiry Pending", "", "success");
      }
    } else {
      Swal.fire({
        title: "Status Already Solved",
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
          Contact Inquiries List
        </Typography>
        <i
          class="fa-solid fa-circle-arrow-up bottomtotop  "
          onClick={scrollToContent}
        ></i>
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
                  {/* {filterValue && (
                  <IconButton onClick={handleClearFilter} edge="end">
                    <ClearIcon />
                  </IconButton>
                )} */}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Sr. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Client Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Message
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Status
                </TableCell>
                <TableCell align="center" style={{ minWidth: "100px" }}>
                  All Details
                </TableCell>
                <TableCell align="left" style={{ minWidth: "50px" }}>
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
                      key={row.code}
                    >
                      <TableCell align="left" style={{ minWidth: "80px" }}>
                        {page * rowsPerPage + i + 1}
                      </TableCell>

                      <TableCell align="left" style={{ minWidth: "80px" }}>
                        {row.Name}
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "80px" }}>
                        {row.Message}
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "80px" }}>
                        {row.status == 0 ? "Pending" : "Solved"}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "80px", justifyContent: "center" }}
                      >
                        <i
                          onClick={() => showalldetails(row)}
                          className="fa-solid fa-circle-info"
                          style={{
                            fontSize: "20px",
                            color: "#294B93",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></i>
                      </TableCell>

                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <i
                            onClick={() => changestatus(1, row._id, row.status)}
                            class="fa-regular fa-circle-check"
                          ></i>

                          {/* <i
                         onClick={()=>changestatus(0,row._id,row.status)}
                          class="fa-regular fa-circle-xmark"
                        ></i> */}
                        </Stack>
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

{
  /* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Button
            className="global_button"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={addJobsData}
          >
            Add Hotel
          </Button> */
}
