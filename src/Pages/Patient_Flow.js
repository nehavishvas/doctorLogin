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
import moment from "moment";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { AppContext } from "../context";

export function Patient_Flow() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const { patientlist, appointmentlist } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (patientlist && appointmentlist) {
      let newarray = appointmentlist.map((e) => {
        let finddata = patientlist.find(
          (k) => k.appointmentNo == e.appointment_no
        );

        return {
          ...e,
          patientFlow: finddata ? finddata.diagnosticStatus.patientFlow : "-",
          patientregistration: finddata ? finddata._id : "",
          payment_done: finddata ? finddata.payment_done : "-",
          x_ray: finddata ? finddata.diagnosticStatus.x_ray : "-",
          laboratory: finddata ? finddata.diagnosticStatus.laboratory : "-",
          xRayReportUploaded: finddata ? finddata.xRayReportUploaded : "-",
          labReportUploaded: finddata ? finddata.labReportUploaded : "-",
        };
      });

      setRows(newarray);
      setSearchApiData(newarray);
    }
  }, [patientlist, appointmentlist]);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.patient_name}`.toLowerCase();
        const lastName = `${item.appointment_no}`.toLowerCase();
        // const phone = `${item.phone_no}`;
        const searchValue = event.target.value.toLowerCase();

        return (
          fullName.includes(searchValue) || lastName.includes(searchValue)
          // phone.includes(searchValue)
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

  const contentRef = React.useRef(null);
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToContent();
  }, []);

  const getCircleColor = (status) => {
    switch (status) {
      case "appointment":
        return "green";
      case "patient_id":
        return "green";
      case "payment":
        return "green";
      case "lab":
        return "green";
      case "xray":
        return "green";
      case "recovered":
        return "green";
      default:
        return "red";
    }
  };

  const getPatientFlowStatus = (row) => {
    return (
      <>
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.appointmentStatus),
            marginRight: "5px",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.patientIdStatus),
            marginRight: "5px",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.paymentStatus),
            marginRight: "5px",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.labStatus),
            marginRight: "5px",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.xrayStatus),
            marginRight: "5px",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getCircleColor(row.recoveryStatus),
          }}
        />
      </>
    );
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
            class="fa-solid fa-circle-arrow-up bottomtotop"
            onClick={scrollToContent}
          ></i>
          All Patient List
        </Typography>
        <NavLink to="Patient_Registration"></NavLink>
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
            <TableHead style={{ whiteSpace: "nowrap" }}>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Name
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment No
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Appointment Confirmed
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Registration
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Registration Fees Paid
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Lab Test Mark (optional)
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Lab Test Complete
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient X-Ray Test Mark (optional)
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient X-Ray Test Complete
                </TableCell>

                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Patient Recovered
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
                        {row.patient_name ? row.patient_name : "_"}{" "}
                      </TableCell>

                      <TableCell align="center">
                        {row.appointment_no ? row.appointment_no : "_"}
                      </TableCell>

                      <TableCell align="center">
                        {row.appointment_status == "confirmed" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.patientregistration ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.payment_done == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.laboratory == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.labReportUploaded == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.x_ray == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.xRayReportUploaded == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.patientFlow == "yes" ? (
                          <button
                            type="button"
                            class="btn btn-primary todaybutton"
                            style={{ backgroundColor: "rgb(196, 222, 167)" }}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => recoveredpatient(row._id)}
                          >
                            No
                          </button>
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
