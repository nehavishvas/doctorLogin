import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import axios from "axios"; // Ensure axios is imported if it's used for the API

const filter = createFilterOptions();

export const Add_Course = () => {
  const [patientList, setPatientList] = useState([]);
  const { patientlist, doctorlist, getalltreatmentdata, MyProfile } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    course_name: "",
    doctor_name: "",
    no_of_sessions: "",
    patient_id: "", // New field to store selected patientId
  });

  const [formError, setFormError] = useState({
    course_name: "",
    doctor_name: "",
    no_of_sessions: "",
    patient_id: "", // Validation for patient selection
  });

  // Update patient list when context changes
  useEffect(() => {
    if (patientlist) {
      setPatientList(patientlist);
    }
  }, [patientlist]);

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      let obj = {
        courseName: form.course_name,
        // doctorId: form.doctor_name,
        doctorId: MyProfile._id,
        patientId: form.patient_id, // Use the selected patientId
        numberOfSession: Number(form.no_of_sessions),
      };

      console.log(obj);

      axios
        .post(`${medicalUrl}addTreatmentCourse`, obj)
        .then((resp) => {
          console.log(resp);
          setForm({
            course_name: "",
            doctor_name: "",
            no_of_sessions: "",
            patient_id: "", // Clear selected patient
          });

          Swal.fire({
            title: "Treatment Course Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Treatment_Courses");
          getalltreatmentdata();
        })
        .catch((error) => {
          console.error("Error adding treatment course:", error);
          Swal.fire({
            title: error.response?.data?.message || "Error adding course",
            icon: "error",
            showConfirmButton: true,
          });
        });
    }
  };

  // Handle changes in form fields
  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let errors = { ...formError };

    switch (name) {
      case "course_name":
        errors.course_name = value ? "" : "Please enter the course name";
        break;
      case "doctor_name":
        errors.doctor_name = value ? "" : "Please select the doctor name";
        break;
      case "no_of_sessions":
        errors.no_of_sessions = value ? "" : "Please enter the no of sessions";
        break;
      case "patient_id":
        errors.patient_id = value ? "" : "Please select a patient";
        break;
      default:
        break;
    }

    setFormError(errors);
  };

  // Validate entire form before submission
  const validate = () => {
    let isValid = true;
    let errors = { ...formError };

    if (!form.course_name) {
      errors.course_name = "Please enter the course name";
      isValid = false;
    }
    // if (!form.doctor_name) {
    //   errors.doctor_name = "Please select the doctor name";
    //   isValid = false;
    // }
    if (!form.no_of_sessions) {
      errors.no_of_sessions = "Please enter the no of sessions";
      isValid = false;
    }
    if (!form.patient_id) {
      errors.patient_id = "Please select a patient";
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
      {/* Autocomplete for Patient Search */}
      <Autocomplete
        style={{ marginLeft: "25px", marginTop: "20px", marginBottom: "30px" }}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            toggleOpen(true);
            setDialogValue({ firstName: newValue, lastName: "" });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({ firstName: newValue.inputValue, lastName: "" });
          } else {
            setValue(newValue);
            setForm({ ...form, patient_id: newValue?._id || "" }); // Store patientId in form
            validateField("patient_id", newValue?._id || "");
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              firstName: `Add "${params.inputValue}"`,
              lastName: "",
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
      <span className="bookingerror" style={{ color: "red" }}>
        {formError.patient_id}
      </span>

      {/* Form Section */}
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
                    <label htmlFor="inputName" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter course name"
                      name="course_name"
                      value={form.course_name}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.course_name}
                    </span>
                  </div>

                  {/* <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointed_doctor" className="form-label">
                      Doctor Name
                    </label>

                    <select
                      className="form-select"
                      name="doctor_name"
                      id="appointed_doctor"
                      value={form.doctor_name}
                      onChange={handlechange}
                    >
                      <option value={""} disabled>
                        Select Doctor
                      </option>
                      {doctorlist &&
                        doctorlist.length > 0 &&
                        doctorlist.map((e) => (
                          <option key={e._id} value={e._id}>
                            {e.name}
                          </option>
                        ))}
                    </select>

                    <span className="bookingerror">
                      {formError.doctor_name}
                    </span>
                  </div> */}

                  <div className="col-lg-6 inputdivs">
                    <label htmlFor="sessions" className="form-label">
                      No of Sessions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sessions"
                      placeholder="Enter no of sessions"
                      name="no_of_sessions"
                      value={form.no_of_sessions}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.no_of_sessions}
                    </span>
                  </div>

                  <div className="col-lg-12 text-center">
                    <button
                      className="btn btn-lg btn-primary"
                      type="submit"
                      style={{ background: "rgb(196,222,167)" }}
                    >
                      Add Course
                    </button>
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
