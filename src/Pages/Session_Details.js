import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { AppContext } from "../context";

const filter = createFilterOptions();

export const Session_Details = () => {
  const [patientList, setPatientList] = useState([]);
  const { patientlist, condition_category, sub_category } =
    useContext(AppContext);
  useEffect(() => {
    if (patientlist) {
      setPatientList(patientlist);

      console.log("tttttttt", patientlist);
    }
  }, [patientlist]);

  const patientLists = [
    {
      address: {
        street: "468/4 near lal sarak multani chowk hansi ,  Hisar",
        city: "Hansi",
        state: "Haryana",
        zip: "125033",
        country: "India",
      },
      emergencyContact: {
        name: "Deepak Munjal",
        relationship: "Brother",
        phone: "6456745463",
      },
      _id: "66f130eb90679cf72b944335",
      firstName: "Akshay",
      lastName: "Seth",
      dateOfBirth: "2024-09-04T00:00:00.000Z",
      gender: "Male",
      phoneNo: "9671494043",
      alternatePhoneNo: 9649456455,
      email: "dmunjal32@gmail.com",
      diseaseName: "Fever",
      referral: "abcddfa  afa af",
      registrationNo: "927949",
      createdAt: "2024-09-23T09:12:11.511Z",
      updatedAt: "2024-09-23T09:50:21.065Z",
      __v: 0,
    },
  ];

  const navigate = useNavigate();

  const [form, setForm] = useState({
    condition_category: "",
    sub_category: "",
    doctornotes: "",
  });

  const [formError, setFormError] = useState({
    condition_category: "",
    sub_category: "",
    doctornotes: "",
  });

  // React.useEffect(() => {
  //   if (condition_category) {
  //     setConditions(condition_category);
  //     console.log(condition_category, "this is condition category");
  //   }

  //   if (sub_category) {
  //     setSubConditions(sub_category);

  //     console.log(sub_category, "this is sub category");
  //   }
  // }, [condition_category, sub_category]);

  useEffect(() => {
    if (sub_category) {
      console.log("this sub category", sub_category);
    }
  }, [sub_category]);
  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      let obj = {
        sub_category: form.sub_category,
        condition_category: Number(form.sub_category),
        doctornotes: form.doctornotes,
      };

      console.log(obj);

      axios
        .post(`${medicalUrl}addTreatmentDetail`, obj)

        .then((resp) => {
          console.log(resp);
          setForm({
            treatmentcourse: "",
            photreatmentfeesne: "",
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

  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formError };

    switch (name) {
      case "condition_category":
        if (!value) {
          errors.condition_category = "Please select the condition category";
        } else {
          errors.condition_category = "";
        }
        break;

      case "sub_category":
        if (!value) {
          errors.sub_category = "Please select the sub category";
        } else {
          errors.sub_category = "";
        }
        break;

      case "doctornotes":
        if (!value) {
          errors.doctornotes = "Please enter the doctor";
        } else {
          errors.doctornotes = "";
        }
        break;

      default:
        break;
    }

    setFormError(errors);
  };

  const validate = () => {
    let isValid = true;
    let errors = {
      treatmentcourse: "",
      treatmentfees: "",
    };

    if (!form.condition_category) {
      errors.condition_category = "Please select the condition category";
      isValid = false;
    }

    if (!form.sub_category) {
      errors.sub_category = "Please select the sub category";
      isValid = false;
    }

    if (!form.doctornotes) {
      errors.doctornotes = "Please enter the doctor notes";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      firstName: "",
      lastName: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      firstName: dialogValue.firstName,
      lastName: dialogValue.lastName,
    });
    handleClose();
  };

  return (
    <div style={{ padding: "25px" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                firstName: newValue,
                lastName: "",
                registrationNo: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              firstName: newValue.inputValue,
              lastName: "",
              registrationNo: "",
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
              firstName: `Add "${params.inputValue}"`,
              lastName: "",
              registrationNo: "",
            });
          }
          return filtered;
        }}
        id="patient-search"
        options={patientList}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return `${option.firstName} ${option.lastName} (Reg No: ${option.registrationNo})`;
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.firstName} {option.lastName} (Reg No:{" "}
            {option.registrationNo})
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search Patient" />
        )}
      />

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new patient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any patient in our list? Please, add them!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              value={dialogValue.firstName}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  firstName: event.target.value,
                })
              }
              label="First Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="lastName"
              value={dialogValue.lastName}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  lastName: event.target.value,
                })
              }
              label="Last Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="registrationNo"
              value={dialogValue.registrationNo}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  registrationNo: event.target.value,
                })
              }
              label="Registration Number"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>

      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ps-0">
              <div className="contactFormdata ">
                <form
                  className="row g-3 booking"
                  onSubmit={handleBookingAppointment}
                >
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter doctor notes"
                      name="doctornotes"
                      value={form.doctornotes}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.doctornotes}
                    </span>
                  </div>
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter doctor notes"
                      name="doctornotes"
                      value={form.doctornotes}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.doctornotes}
                    </span>
                  </div>
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      No. of Sessions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter doctor notes"
                      name="doctornotes"
                      value={form.doctornotes}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.doctornotes}
                    </span>
                  </div>
                  <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputselected_slot" className="form-label">
                      Condition Category
                    </label>
                    <select
                      type="text"
                      className="form-select"
                      id="inputselected_slot"
                      name="condition_category"
                      value={form.condition_category}
                      onChange={handlechange}
                    >
                      <option value="" disabled>
                        Select Condition
                      </option>

                      {condition_category &&
                        condition_category.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                    </select>

                    <span className="bookingerror">
                      {formError.condition_category}
                    </span>
                  </div>{" "}
                  <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputselected_slot" className="form-label">
                      Sub Category List
                    </label>
                    <select
                      type="text"
                      className="form-select"
                      id="inputselected_slot"
                      name="sub_category"
                      value={form.sub_category}
                      onChange={handlechange}
                    >
                      <option value="" disabled>
                        Select Sub Condition
                      </option>
                    </select>

                    <span className="bookingerror">
                      {formError.sub_category}
                    </span>
                  </div>{" "}
                  <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Doctor Notes
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter doctor notes"
                      name="doctornotes"
                      value={form.doctornotes}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.doctornotes}
                    </span>
                  </div>
                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Submit
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
    </div>
  );
};
