import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const Condition_Category = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    category_name: "",
  });

  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    category_name: "",
  });

  const {
    appointmentsperday,
    getappointmentsperdayapi,
    getconditioncategoryapi,

    patientlist,
  } = useContext(AppContext);

  /*-----------------------------*/
  useEffect(() => {
    if (appointmentsperday) {
      setForm((form) => ({
        ...form,
        // appointments_per_day: appointmentsperday.appointmentPerDay,
        // slot_duration: Number(appointmentsperday.slotDuration),
      }));
    }
  }, [appointmentsperday]);

  /*-----------------------------*/

  const validate = () => {
    let isValid = true;
    let errors = {
      category_name: "",
    };

    if (!form.category_name) {
      errors.category_name = "Please enter the category name";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        categoryName: form.category_name,
      };
      axios
        .post(`${medicalUrl}createCategory`, obj)
        .then((resp) => {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Display_Condition_Category");
          setForm({});
          getappointmentsperdayapi();
          getconditioncategoryapi();
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
      case "category_na,e":
        if (!value) {
          errors.category_name = "Please enter the category name";
          isValid = false;
        } else {
          errors.category_name = "";
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
              <h5 className="addpatient">Condition Category</h5>
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
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="category_name"
                      id="inputappointmentsperday"
                      placeholder="Enter category name"
                      value={form.category_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.category_name}
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
