import React, { useContext, useRef } from "react";
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { wrapWithWarningOnCall } from "@mui/x-data-grid/utils/warning";

export function Display_Session() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {
    appointmentlist,
    getappointmentapi,
    treatmentcourses,
    gettreatmentcourseapi,
    allTreatmentData,
    getalltreatmentdata,
    getallsessiondata,
    SessionData,
    treatmentcourseid,
    numberofsessions,
  } = useContext(AppContext);

  const location = useLocation();

  const { _id, numberOfSession } = location.state || {};

  const [sessionlength, setSessionLength] = useState("");
  useEffect(() => {
    if (rows) {
      setSessionLength(rows.length);
    }
  }, [rows]);
  const addsession = () => {
    console.log("id is ", treatmentcourseid);
    console.log("rows length is ", rows.length);
    console.log("no of session is ", numberofsessions);

    if (Number(numberofsessions) === sessionlength) {
      Swal.fire({
        title: "You have reached the maximum number of sessions",
        icon: "info",
      });
    } else {
      navigate("Add_Session", { state: { id: treatmentcourseid } });
    }
  };

  useEffect(() => {
    if (numberOfSession) {
      console.log(numberOfSession, "this is display session page sesion");
    }
    if (treatmentcourseid) {
      console.log(treatmentcourseid, "this is display session page id");
    }

    if (rows) {
      console.log("rows length is ", rows.length);
    }
  }, [numberofsessions, treatmentcourseid, rows]);

  useEffect(() => {
    if (allTreatmentData) {
      console.log(allTreatmentData, "this data is all treatment data");
    }
  }, [allTreatmentData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (SessionData) {
      let data = SessionData.filter(
        (e) => e.treatmentCourseId == treatmentcourseid
      );
      setRows(data);
      setSearchApiData(data);
    }
  }, [SessionData]);

  // const addJobsData = () => {
  //   navigate("/admin/AddHotelManager");
  // };

  const displaysessions = (row) => {
    console.log("hii");
    navigate("./Display_Session", { state: row });
  };
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.patientName}`.toLowerCase();
        const phone = `${item.treatmentFees}`;
        const searchValue = event.target.value.toLowerCase();

        return fullName.includes(searchValue) || phone.includes(searchValue);
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };

  const updateprofile = (row) => {
    navigate("./Update_Session", { state: { row } });
  };

  const deletestaff = (staffid) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${medicalUrl}deleteTreatmentDetail/${staffid}`)
          .then((resp) => {
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
            });

            // Update the rows state to reflect the deleted doctor immediately
            setRows((prevRows) =>
              prevRows.filter((row) => row._id !== staffid)
            );
            setSearchApiData((prevRows) =>
              prevRows.filter((row) => row._id !== staffid)
            );

            getallsessiondata();
          })

          .catch((error) => {
            Swal.fire({
              title: "Deleted Failed",
              icon: "error",
            });
          });
      }
    });
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  const contentRef = useRef(null);
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
          {/* <i
            class="fa-solid fa-circle-arrow-up bottomtotop"
            onClick={scrollToContent}
          ></i> */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>All Sessions</div>
            <div>
              <button
                className="plusiconforadd testimonialposition"
                onClick={addsession}
              >
                Add Session
                <i class="fa-p fa-plus" style={{ color: "black" }}></i>{" "}
              </button>
            </div>
          </div>
        </Typography>

        <Divider />
        <Box height={10} />
        {/* <Stack direction="row" spacing={2} className="my-2 mb-2">
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
        </Stack> */}
        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ "white-space": "nowrap" }}>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Session Date
                </TableCell>
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Category
                </TableCell>
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Sub Category
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    minWidth: "80px",
                    maxWidth: "120px",
                  }}
                >
                  Doctor Notes
                </TableCell>

                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Status
                </TableCell>

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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell align="left">
                        {page * rowsPerPage + i + 1}
                      </TableCell>
                      <TableCell align="center">
                        {row.sessionDate
                          ? moment(row.sessionDate).format("D MMM, YYYY")
                          : "_"}
                      </TableCell>
                      <TableCell align="center">
                        {row.categoryName ? row.categoryName : "_"}
                      </TableCell>
                      <TableCell align="center">
                        {row.subCategoryName ? row.subCategoryName : "_"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ textWrap: "wrap", maxWidth: "200px" }}
                      >
                        {row.doctorNotes ? row.doctorNotes : "_"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: row.status == 1 ? "green" : "red" }}
                      >
                        {/* <Stack
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
                            onClick={() => displaysessions(row)}
                          ></i>
                              </Stack>
                               */}

                        {row.status
                          ? row.status === 1
                            ? "Attend"
                            : row.status === 0
                            ? "Missed"
                            : "-"
                          : "Missed"}
                      </TableCell>
                      <TableCell align="center">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => updateprofile(row)}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deletestaff(row._id)}
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
