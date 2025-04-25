import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../context";

export const Update_Doctor_Details = () => {
  const { getdoctordata } = useContext(AppContext);
  const location = useLocation();

  const { row } = location.state;
  useEffect(() => {
    if (row) {
      console.log("this is details for update", row);

      let newobj = {
        ...row,
        specialization: row.speciality,
        appointments_per_day: row.appointmentPerDay,
        slot_duration: row.slotDuration,
      };
      setForm(newobj);
    }
  }, [row]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    fees: "",
    specialization: "",
    email: "",
    appointments_per_day: "",
    slot_duration: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    phone: "",
    gender: "",
    fees: "",
    specialization: "",
    email: "",
    appointments_per_day: "",
    slot_duration: "",
  });

  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = { ...formError };

    switch (name) {
      case "name":
        if (!value) {
          error.name = "Please enter the name";
        } else {
          error.name = "";
        }
        break;

      case "phone":
        if (!value) {
          error.phone = "Please enter the phone number";
        } else if (value.toString().length !== 10) {
          error.phone = "Phone number must be 10 digits";
        } else {
          error.phone = "";
        }
        break;

      case "gender":
        if (!value) {
          error.gender = "Please select gender";
        } else {
          error.gender = "";
        }
        break;

      case "fees":
        if (!value) {
          error.fees = "Please enter doctor fees";
        } else {
          error.fees = "";
        }
        break;

      case "specialization":
        if (!value) {
          error.specialization = "Please enter the specialization";
        } else {
          error.specialization = "";
        }
        break;

      case "email":
        if (!value) {
          error.email = "Please enter email id";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error.email = "Please enter a valid email address";
        } else {
          error.email = "";
        }
        break;

      case "appointments_per_day":
        if (!value) {
          error.appointments_per_day = "Please enter the appointments per day";
        } else {
          error.appointments_per_day = "";
        }
        break;

      case "slot_duration":
        if (!value) {
          error.slot_duration = "Please enter the slot duration";
        } else {
          error.slot_duration = "";
        }
        break;

      // case "password":
      //   if (!value) {
      //     error.password = "Please enter the password";
      //   } else {
      //     error.password = "";
      //   }
      //   break;

      default:
        break;
    }

    setFormError(error);
  };

  const validate = () => {
    let isValid = true;

    let error = {
      name: "",
      phone: "",
      gender: "",
      fees: "",
      specialization: "",
      email: "",
      appointments_per_day: "",
      slot_duration: "",
    };

    if (!form.name) {
      error.name = "Please enter the name";
      isValid = false;
    } else {
      error.name = "";
    }

    if (!form.email) {
      error.email = "Please enter the email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      error.email = "Please enter a valid email address";
      isValid = false;
    } else {
      error.email = "";
    }

    if (!form.phone) {
      error.phone = "Please enter phone number";
      isValid = false;
    } else if (form.phone.length !== 10) {
      error.phone = "Phone number must be 10 digits";
      isValid = false;
    } else {
      error.phone = "";
    }

    if (!form.gender) {
      error.gender = "Please select gender";
      isValid = false;
    } else {
      error.gender = "";
    }

    if (!form.specialization) {
      error.specialization = "Please enter doctor specialization";
      isValid = false;
    } else {
      error.specialization = "";
    }

    if (!form.fees) {
      error.fees = "Please enter doctor fees";
      isValid = false;
    } else {
      error.fees = "";
    }

    if (!form.appointments_per_day) {
      error.appointments_per_day = "Please enter the appointments per day";
      isValid = false;
    } else {
      error.appointments_per_day = "";
    }

    if (!form.slot_duration) {
      error.slot_duration = "Please enter the slot duration";
      isValid = false;
    } else {
      error.slot_duration = "";
    }

    setFormError(error);
    console.log(isValid);

    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        name: form.name,
        gender: form.gender,
        email: form.email,
        phone: form.phone,
        speciality: form.specialization,
        fees: Number(form.fees),
        appointmentPerDay: form.appointments_per_day,
        slotDuration: form.slot_duration,
      };

      console.log(obj, "this data will pass");
      axios
        .put(`${medicalUrl}updateDoctorData/${row._id}`, obj)

        .then((resp) => {
          setForm({
            name: "",
            phone: "",
            gender: "",
            fees: "",
            specialization: "",
            email: "",
            appointments_per_day: "",
            slot_duration: "",
          });

          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/My_Schedule");
          getdoctordata();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        });
    }
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8  ">
              <h5 className="addpatient">Update Doctor Details</h5>
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
                    <label htmlFor="inputName" className="form-label">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.name}</span>
                  </div>

                  <div className="col-md-6 col-lg-6 inputdivs">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={form.email}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.email}</span>
                  </div>

                  <div className="col-lg-6 inputdivs">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      id="inputPhone"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.phone}</span>
                  </div>

                  <div className="col-lg-6 inputdivs">
                    <label htmlFor="inputPhone" className="form-label">
                      Gender
                    </label>

                    <select
                      className="form-select"
                      onChange={handlechange}
                      value={form.gender || ""}
                      name="gender"
                    >
                      <option disabled value={""}>
                        Select Gender
                      </option>

                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                      <option value={"Others"}>Others</option>
                    </select>

                    <span className="bookingerror">{formError.gender}</span>
                  </div>

                  <div className="col-md-4 col-lg-6 inputdivs">
                    <label htmlFor="inputRole" className="form-label">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRole"
                      name="specialization"
                      placeholder="Specialization"
                      value={form.specialization}
                      onChange={handlechange}
                    />

                    <span className="bookingerror">
                      {formError.specialization}
                    </span>
                  </div>

                  <div className="col-lg-6 inputdivs">
                    <label htmlFor="inputFees" className="form-label">
                      Fees (Per Session)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputFees"
                      name="fees"
                      placeholder="Fees"
                      value={form.fees}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.fees}</span>
                  </div>

                  <div className="col-md-12 col-lg-6 inputdivs">
                    <label
                      htmlFor="inputappointmentsperday"
                      className="form-label"
                    >
                      Appointments Per Day
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="appointments_per_day"
                      id="inputappointmentsperday"
                      placeholder="Enter no of appointments per day"
                      value={form.appointments_per_day || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.appointments_per_day}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-6 inputdivs">
                    <label htmlFor="inputslotduration" className="form-label">
                      Slot Duration ( in minutes )
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="slot_duration"
                      id="inputslotduration"
                      placeholder="Enter slot duration in minutes"
                      value={form.slot_duration || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.slot_duration}
                    </span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Update Details
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
    </>
  );
};
