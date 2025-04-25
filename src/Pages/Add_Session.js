import React, { useContext, useEffect, useState } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useLocation, useNavigate } from "react-router";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import axios from "axios";

export const Add_Session = () => {
  const [patientList, setPatientList] = useState([]);
  const {
    patientlist,
    condition_category,
    sub_category,
    getallsessiondata,
    treatmentcourseid,
  } = useContext(AppContext);
  useEffect(() => {
    if (patientlist) {
      setPatientList(patientlist);

      console.log("tttttttt", patientlist);
    }
  }, [patientlist]);

  //   useEffect(() => {
  //     if (treatmentcourseid) {
  //       alert("hii");
  //     }
  //   }, [treatmentcourseid]);

  const navigate = useNavigate();

  const location = useLocation();

  const { id } = location.state || {};

  const [form, setForm] = useState({
    condition_category: "",
    sub_category: "",
    doctor_notes: "",
    session_date: "",
  });

  const [formError, setFormError] = useState({
    condition_category: "",
    sub_category: "",
    doctor_notes: "",
    session_date: "",
  });

  useEffect(() => {
    if (sub_category) {
      console.log("this sub category", sub_category);
    }
  }, [sub_category]);

  const [filtered_sub_category, setFilteredSubCategory] = useState([]);

  useEffect(() => {
    if (form.condition_category && sub_category) {
      let selectedcategory = form.condition_category;

      let data = sub_category.filter((e) => e.categoryId == selectedcategory);
      setFilteredSubCategory(data);
    }
  }, [form.condition_category, sub_category]);
  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      let obj = {
        categoryId: form.condition_category,
        subCategoryId: form.sub_category,
        doctorNotes: form.doctor_notes,
        sessionDate: form.session_date,
        treatmentCourseId: treatmentcourseid && treatmentcourseid,
      };

      console.log(obj);

      axios
        .post(`${medicalUrl}addTreatmentDetail`, obj)

        .then((resp) => {
          console.log(resp);
          getallsessiondata();

          Swal.fire({
            title: "Session Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Treatment_Courses/Display_Session");

          setForm({
            condition_category: "",
            sub_category: "",
            doctor_notes: "",
            session_date: "",
          });
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

      case "doctor_notes":
        if (!value) {
          errors.doctor_notes = "Please enter the doctor notes";
        } else {
          errors.doctor_notes = "";
        }
        break;

      case "session_date":
        if (!value) {
          errors.session_date = "Please enter the session date";
        } else {
          errors.session_date = "";
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
      condition_category: "",
      sub_category: "",
      doctor_notes: "",
      session_date: "",
    };

    if (!form.condition_category) {
      errors.condition_category = "Please select the condition category";
      isValid = false;
    }

    if (!form.sub_category) {
      errors.sub_category = "Please select the sub category";
      isValid = false;
    }

    if (!form.session_date) {
      errors.session_date = "Please enter the session date";
      isValid = false;
    }

    if (!form.doctor_notes) {
      errors.doctor_notes = "Please enter the doctor notes";
      isValid = false;
    }

    setFormError(errors);
    console.log("this is form data ", form);
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

  const [session_dates, setSessionDates] = useState([]);
  return (
    <div style={{ padding: "25px" }}>
      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ps-0">
              <div className="contactFormdata ">
                <form
                  className="row g-3 booking"
                  onSubmit={handleBookingAppointment}
                >
                  {/* <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="patientname"
                      value={form.doctornotes}
                      disabled={true}
                    />
                  </div> */}
                  {/* <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="doctorname"
                      value={form.doctornotes}
                      disabled={true}
                    />
                  </div> */}
                  {/* <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      No. of Sessions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="noofsessions"
                      disabled={true}
                      value={form.doctornotes}
                    />
                  </div> */}
                  <div className="col-lg-4 inputdivs">
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
                        Select Category
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
                  <div className="col-lg-4 inputdivs">
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

                      {filtered_sub_category &&
                        filtered_sub_category.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.subCategoryName}
                          </option>
                        ))}
                    </select>

                    <span className="bookingerror">
                      {formError.sub_category}
                    </span>
                  </div>{" "}
                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDateofbirth" className="form-label">
                      Session Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      id="inputDateofbirth"
                      name="session_date"
                      value={form.session_date}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]} // Set max date to today
                    />

                    <span className="bookingerror">
                      {formError.session_date}
                    </span>
                  </div>
                  <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Doctor Notes
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter doctor notes"
                      name="doctor_notes"
                      rows={5}
                      value={form.doctor_notes}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.doctor_notes}
                    </span>
                  </div>
                  <div>
                    <button
                      style={{
                        display: "flex",

                        marginRight: "0px",
                      }}
                      className="btn btn-primary interaction"
                    >
                      Session Interaction
                    </button>
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
