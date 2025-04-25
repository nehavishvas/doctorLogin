import React, { useContext, useEffect, useState } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useLocation, useNavigate } from "react-router";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { AppContext } from "../context";

export const Treatment_Details = () => {
  const [patientList, setPatientList] = useState([]);
  const { patientlist, condition_category, sub_category } =
    useContext(AppContext);
  useEffect(() => {
    if (patientlist) {
      setPatientList(patientlist);

      console.log("tttttttt", patientlist);
    }
  }, [patientlist]);

  const navigate = useNavigate();

  const location = useLocation();

  const { firstName, lastName, doctorId, no_of_sessions } =
    location.state || {};

  const [form, setForm] = useState({
    condition_category: "",
    sub_category: "",
    doctornotes: "",
    session_dates: "",
  });

  const [formError, setFormError] = useState({
    condition_category: "",
    sub_category: "",
    doctornotes: "",
    session_dates: "",
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

    if (!form.session_dates) {
      errors.session_dates = "Please enter the session dates";
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
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      //   placeholder="Enter doctor notes"
                      name="patientname"
                      value={form.doctornotes}
                      disabled={true}
                      //   onChange={handlechange}
                    />
                    {/* <span className="bookingerror">
                      {formError.doctornotes}
                    </span> */}
                  </div>
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      //   placeholder="Enter doctor notes"
                      name="doctorname"
                      value={form.doctornotes}
                      //   onChange={handlechange}
                      disabled={true}
                    />
                    {/* <span className="bookingerror">
                      {formError.doctornotes}
                    </span> */}
                  </div>
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      No. of Sessions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      //   placeholder="Enter doctor notes"
                      name="noofsessions"
                      disabled={true}
                      value={form.doctornotes}
                      //   onChange={handlechange}
                    />
                    {/* <span className="bookingerror">
                      {formError.doctornotes}
                    </span> */}
                  </div>
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
                  <div className="col-lg-4 inputdivs">
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
                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDateofbirth" className="form-label">
                      Session Dates
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      id="inputDateofbirth"
                      name="session_dates"
                      value={form.session_dates}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]} // Set max date to today
                    />

                    <button className="btn btn-danger" onClick={"removedate"}>
                      Remove
                    </button>
                    <button className="btn btn-primary" onClick={"adddate"}>
                      Add
                    </button>

                    <span className="bookingerror">
                      {formError.date_of_birth}
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
