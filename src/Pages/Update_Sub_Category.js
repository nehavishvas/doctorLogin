import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const Update_Sub_Category = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    category_name: "",
    sub_category: "",
  });

  const { subCategoryName, categoryName, _id } = location.state || {};

  useEffect(() => {
    if (location.state) {
      setForm({ category_name: categoryName, sub_category: subCategoryName });
    }
  }, [location.state]);
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    category_name: "",
    sub_category: "",
  });

  const {
    getappointmentsperdayapi,
    getsubcategoryapi,

    patientlist,
    condition_category,
  } = useContext(AppContext);

  useEffect(() => {
    if (condition_category) {
      console.log("condition category options in sub page", condition_category);
      setCategory(condition_category);
    }
  }, [condition_category]);

  const [category, setCategory] = useState([]);

  const validate = () => {
    let isValid = true;
    let errors = {
      category_name: "",
      sub_category: "",
    };

    if (!form.category_name) {
      errors.category_name = "Please select the category name";
      isValid = false;
    }

    if (!form.sub_category) {
      errors.sub_category = "Please enter the sub category name";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        subCategoryName: form.sub_category,
      };
      axios
        .put(`${medicalUrl}updateSubCategory/${_id}`, obj)
        .then((resp) => {
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Display_Sub_Category");

          getappointmentsperdayapi();
          getsubcategoryapi();

          setForm({});

          setForm((prevForm) => ({
            ...prevForm,
            category_name: "",
            sub_category: "",
          }));
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
      case "category_name":
        if (!value) {
          errors.category_name = "Please select the category name";
          isValid = false;
        } else {
          errors.category_name = "";
        }
        break;

      case "sub_category":
        if (!value) {
          errors.sub_category = "Please enter the sub category name";
          isValid = false;
        } else {
          errors.sub_category = "";
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
              <h5 className="addpatient">Update Sub Category</h5>
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
                    <select
                      type="text"
                      className="form-select"
                      id="inputselected_slot"
                      name="category_name"
                      value={form.category_name}
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
                      {formError.category_name}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputappointmentsperday"
                      className="form-label"
                    >
                      Sub Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sub_category"
                      id="inputappointmentsperday"
                      placeholder="Enter sub category name"
                      value={form.sub_category}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.sub_category}
                    </span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Update <i className="fa fa-arrow-right" />
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
