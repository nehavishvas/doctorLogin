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
import Swal from "sweetalert2";
import axios from "axios";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { AppContext } from "../context";
import MyProfile from "../Page/SuperAdminLogin/MyProfile";

export function My_Schedule() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const {
    UPDATESTAFF,
    doctorlist,
    getdoctordata,
    MyProfile,
    getalldoctoravailability,
  } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changepassword = (id) => {
    navigate("./Change_Doctor_Password", { state: { id: id } });
  };
  useEffect(() => {
    if (doctorlist) {
      let data = doctorlist.filter((e) => e._id == MyProfile._id);

      if (data) {
        setRows(data);
        setSearchApiData(data);
      }
    }
  }, [doctorlist]);

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
          .delete(`${medicalUrl}deleteDoctorData/${staffid}`)
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

            // Optionally re-fetch the data to ensure everything is updated
            getdoctordata();
            getalldoctoravailability();
          })
          .catch((error) => {
            Swal.fire({
              title: error.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };

  const updateprofile = (row) => {
    navigate("./Update_Doctor_Details", { state: { row } });
  };

  const changedisabled = () => {
    UPDATESTAFF(false);
  };

  const doctordetails = (row) => {
    navigate("Doctor_Details", { state: row });
  };
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.name}`.toLowerCase();
        const phone = `${item.phone}`;
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

  const addslotspage = (doctorid) => {
    navigate("Add_Slot", { state: { id: doctorid } });
    console.log(doctorid);
  };

  const addvacations = (doctorid) => {
    navigate("Add_Vacations", { state: { id: doctorid } });
    console.log(doctorid);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>My Schedule</div>

            {/* <div>
              <NavLink to="Doctors_Staff">
                <button
                  className="plusiconforadd testimonialposition"
                  onClick={changedisabled}
                >
                  {" "}
                  Add Doctor{" "}
                  <i class="fa-p fa-plus" style={{ color: "black" }}></i>{" "}
                </button>
              </NavLink>
            </div> */}
          </div>
        </Typography>

        <Divider />
        <Box height={10} />

        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ "white-space": "nowrap" }}>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Doctor Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Phone
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Specialization
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Fees
                </TableCell>

                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Add Slots
                </TableCell>

                <TableCell align="center" style={{ minWidth: "80px" }}>
                  Change Password
                </TableCell>

                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  Add Vacations
                </TableCell> */}

                {/* <TableCell align="left" style={{ minWidth: "80px" }}>
                  All Details
                </TableCell> */}

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
                        {row.name ? row.name : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.phone ? row.phone : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.speciality ? row.speciality : "_"}
                      </TableCell>

                      <TableCell align="left">
                        {row.fees ? row.fees : "_"}
                      </TableCell>

                      <TableCell align="left">
                        <button
                          className="btn btn-primary"
                          onClick={() => addslotspage(row._id)}
                        >
                          Manage Schedule
                        </button>
                      </TableCell>

                      <TableCell align="left">
                        <button
                          className="btn btn-primary"
                          onClick={() => changepassword(row._id)}
                        >
                          Change Password
                        </button>
                      </TableCell>

                      {/* <TableCell align="left">
                        <button
                          className="btn btn-primary"
                          onClick={() => addvacations(row._id)}
                        >
                          Vacations
                        </button>
                      </TableCell> */}

                      {/* <TableCell align="left">
                        <button
                          className="btn btn-info"
                          onClick={() => doctordetails(row)}
                        >
                          Info
                        </button>
                      </TableCell> */}

                      <TableCell align="left">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => updateprofile(row)}
                        ></i>
                        {/* <i
                          className="fa-solid fa-trash"
                          onClick={() => deletestaff(row._id)}
                        ></i> */}
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
