import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { AppContext } from "../context";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: "",
      year: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
    year: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });
    handleClose();
  };

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  React.useEffect(() => {
    if (patientlist) {
    }
  }, [patientlist]);

  const [form, setForm] = React.useState({
    treatmentfees: "",
    treatmentcourse: "",
  });

  const [formError, setFormError] = React.useState({
    treatmentfees: "",
    treatmentcourse: "",
  });

  const navigate = useNavigate();
  const {
    appointmentlist,
    getappointmentapi,
    todayappointmentrefresh,
    gettreatmentcourseapi,
    patientlist,
  } = React.useContext(AppContext);

  const [allappointment, setAllAppointment] = React.useState([]);

  React.useEffect(() => {
    if (appointmentlist) {
      setAllAppointment(appointmentlist);
    }
  }, [appointmentlist]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      let obj = {
        treatmentCourse: "abc",
      };

      console.log(obj);

      axios
        .post(`${medicalUrl}addTreatmentDetail`, obj)
        .then((resp) => {
          console.log(resp);
          setForm({
            treatmentcourse: "",
            treatmentfees: "",
          });

          gettreatmentcourseapi();

          Swal.fire({
            title: "Treatment Course Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Treatment_Courses");
        })
        .catch((error) => {
          console.error("Error treatment course added:", error);
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        });
    }
  };

  return (
    <React.Fragment>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Add Treatment Course</h5>
            </div>
          </div>
          <hr className="hrline" />
        </div>
      </section>
      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ps-0">
              <div className="contactFormdata ">
                <form
                  className="row g-3 booking"
                  onSubmit={handleBookingAppointment}
                >
                  <div className="col-lg-6 inputdivs">
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                              title: newValue,
                              year: "",
                            });
                          });
                        } else if (newValue && newValue.inputValue) {
                          toggleOpen(true);
                          setDialogValue({
                            title: newValue.inputValue,
                            year: "",
                          });
                        } else {
                          setValue(newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== "") {
                          filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      id="free-solo-dialog-demo"
                      options={top100Films}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        return option.title;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option.title}</li>
                      )}
                      sx={{ width: "100%" }}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select or Add a Film"
                          fullWidth
                        />
                      )}
                    />
                    <Dialog open={open} onClose={handleClose}>
                      <form onSubmit={handleSubmit}>
                        <DialogTitle>Add a new film</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            value={dialogValue.title}
                            onChange={(event) =>
                              setDialogValue({
                                ...dialogValue,
                                title: event.target.value,
                              })
                            }
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            margin="dense"
                            value={dialogValue.year}
                            onChange={(event) =>
                              setDialogValue({
                                ...dialogValue,
                                year: event.target.value,
                              })
                            }
                            label="Year"
                            type="number"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button type="submit">Add</Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </div>
                  {/* Other form fields */}
                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Add Treatment Course
                        <i className="fa fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
