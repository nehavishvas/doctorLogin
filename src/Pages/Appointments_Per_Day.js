import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const Appointments_Per_Day = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    appointments_per_day: "",
    slot_duration: "",
  });

  const [formError, setFormError] = useState({
    appointments_per_day: "",
    slot_duration: "",
  });

  const {
    appointmentsperday,
    getappointmentsperdayapi,

    patientlist,
  } = useContext(AppContext);

  /*-----------------------------*/
  useEffect(() => {
    if (appointmentsperday) {
      setForm((form) => ({
        ...form,
        appointments_per_day: appointmentsperday.appointmentPerDay,
        slot_duration: Number(appointmentsperday.slotDuration),
      }));
    }
  }, [appointmentsperday]);

  /*-----------------------------*/

  const validate = () => {
    let isValid = true;
    let errors = {
      appointments_per_day: "",
    };

    if (!form.appointments_per_day) {
      errors.appointments_per_day =
        "Please enter the number of appointments per day";
      isValid = false;
    }

    if (!form.slot_duration) {
      errors.slot_duration = "Please enter the slot duration in minutes";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        appointmentPerDay: form.appointments_per_day,
        slotDuration: Number(form.slot_duration),
      };
      axios
        .post(`${medicalUrl}createAppointmentPerDay`, obj)
        .then((resp) => {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          getappointmentsperdayapi();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });
        });
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = true;
    let errors = { ...formError };
    switch (name) {
      case "appointments_per_day":
        if (!value) {
          errors.appointments_per_day =
            "Please enter the number of appointments per day";
          isValid = false;
        } else {
          errors.appointments_per_day = "";
        }
        break;

      case "slot_duration":
        if (!value) {
          errors.slot_duration = "Please enter the slot duration in minutes";
          isValid = false;
        } else {
          errors.slot_duration = "";
        }
        break;

      default:
        break;
    }

    setFormError(errors);
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Appointments Per Day</h5>
            </div>
          </div>
          <hr className="hrline" />
        </div>
      </section>

      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ps-0">
              <div className="contactFormdata">
                <form
                  className="row g-3 booking"
                  onSubmit={handleBookingAppointment}
                >
                  <div className="col-md-12 col-lg-4 inputdivs">
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

                  <div className="col-md-12 col-lg-4 inputdivs">
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
                        Submit <i className="fa fa-arrow-right" />
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
