import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router";
import { AppContext } from "../context";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const Add_Staff = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const pages = [
    { title: "Staff_List" },
    { title: "Doctors_List" },
    { title: "Patient_List" },
    { title: "Appointment_List" },
    { title: "Display_Condition_Category" },
    { title: "Display_Sub_Category" },
    { title: "Treatment_Courses" },
  ];

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    image: "",
    pages: [], // Initialize pages as an empty array
  });

  const [formError, setFormError] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    image: "",
    pages: "", // Error field for pages
  });

  const { allrole, getstaffdata } = useContext(AppContext);
  const inputimagefile = useRef();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    validateField(name, value);
  };

  // Handle page selection change
  const handlePageSelection = (pageTitle) => {
    setForm((prevForm) => {
      const pages = prevForm.pages.includes(pageTitle)
        ? prevForm.pages.filter((page) => page !== pageTitle) // Remove if already selected
        : [...prevForm.pages, pageTitle]; // Add if not selected
      return { ...prevForm, pages };
    });
    validateField("pages", pages);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let errors = { ...formError };
    switch (name) {
      case "name":
        errors.name = value ? "" : "Please enter the name";
        break;
      case "role":
        errors.role = value ? "" : "Please select the role";
        break;
      case "password":
        errors.password = value ? "" : "Please enter the password";
        break;
      case "image":
        errors.image = value ? "" : "Please upload the image";
        break;
      case "email":
        errors.email =
          value && /\S+@\S+\.\S+/.test(value)
            ? ""
            : value
            ? "Please enter a valid email address"
            : "Please enter email id";
        break;
      case "pages":
        errors.pages =
          value.length > 0 ? "" : "Please select at least one page";
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  // Validate entire form
  const validate = () => {
    let isValid = true;
    let errors = { ...formError };

    if (!form.name) errors.name = "Please enter staff name";
    if (!form.role) errors.role = "Please select the role";
    if (!form.password) errors.password = "Please enter the password";
    if (!form.email) errors.email = "Please enter email id";
    if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Please enter a valid email address";
    if (!imageFile) errors.image = "Please upload the image";
    if (form.pages.length === 0)
      errors.pages = "Please select at least one page";

    setFormError(errors);

    for (const key in errors) {
      if (errors[key]) isValid = false;
    }
    return isValid;
  };

  // Handle form submission
  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      let formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("email", form.email);
      formdata.append("role", form.role);
      formdata.append("password", form.password);
      formdata.append("profileImage", imageFile);

      // Add selected pages to the form data
      form.pages.forEach((page, index) => {
        formdata.append(`pages[${index}]`, page);
      });

      axios
        .post(`${medicalUrl}addUserStaffData`, formdata)
        .then((resp) => {
          Swal.fire({
            title: "Staff Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          navigate("/admin/Staff_List");
          resetForm();
          if (getstaffdata) {
            getstaffdata();
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.response ? error.response.data.message : "API Error",
            icon: "error",
            showConfirmButton: true,
          });
        });
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setForm({ name: "", role: "", email: "", password: "", pages: [] });
    inputimagefile.current.value = "";
    setImageUrl("");
    setImageFile("");
  };

  // Handle image upload
  const imageUpload = (event) => {
    let file = event.target.files[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(url);
      validateField("image", url);
    }
  };

  const handleCheckboxChange = (page) => {
    setForm((prevForm) => {
      const { pages } = prevForm;
      if (pages.includes(page)) {
        // Remove page if already selected
        return { ...prevForm, pages: pages.filter((p) => p !== page) };
      } else {
        // Add page if not selected
        return { ...prevForm, pages: [...pages, page] };
      }
    });
    validateField("pages", form.pages);
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Add Staff</h5>
            </div>
          </div>
          <hr className="hrline" />
        </div>
      </section>

      {/* Pages Selection Autocomplete */}
      {/* <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={pages}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        value={form.pages} // Ensure value is set to form.pages
        onChange={handlePageSelection}
        isOptionEqualToValue={(option, value) => option.title === value.title} // Ensure correct equality check
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected} // Display checkbox as checked if selected
            />
            {option.title}
          </li>
        )}
        style={{
          width: 300,
          marginLeft: "25px",
          marginBottom: "30px",
          marginTop: "25px",
        }}
        renderInput={(params) => <TextField {...params} label="Select Pages" />}
      />
      {formError.pages && (
        <span
          className="bookingerror"
          style={{
            color: "red",
            marginLeft: "25px",
            position: "relative",
            top: "-25px",
          }}
        >
          {formError.pages}
        </span>
      )} */}

      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ps-0">
              <div className="contactFormdata">
                <form
                  className="row g-3 booking"
                  onSubmit={handleBookingAppointment}
                >
                  <div className="col-lg-6 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Staff Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="inputName"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <span className="bookingerror">{formError.name}</span>
                  </div>

                  <div className="col-md-6 col-lg-6 inputdivs">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <span className="bookingerror">{formError.email}</span>
                  </div>

                  <div className="col-md-12 col-lg-6 inputdivs">
                    <label htmlFor="inputPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <span className="bookingerror">{formError.password}</span>
                  </div>

                  <div className="col-md-6 col-lg-6 inputdivs">
                    <label htmlFor="inputRole" className="form-label">
                      Role
                    </label>
                    <select
                      name="role"
                      id="inputRole"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      {allrole?.map((role) => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <span className="bookingerror">{formError.role}</span>
                  </div>
                  {/* <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputPermission" className="form-label">
                      Permission
                    </label>

                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {pages.map((page) => (
                        <div
                          key={page.title}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={form.pages.includes(page.title)}
                            onChange={() => handlePageSelection(page.title)}
                            style={{ padding: 0 }} // Remove default padding
                          />
                          <span>{page.title}</span>
                        </div>
                      ))}
                    </div>

                    <span className="bookingerror">{formError.pages}</span>
                  </div> */}

                  <div className="col-lg-12 inputdivs">
                    <label htmlFor="inputPermission" className="form-label">
                      Permission
                    </label>

                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {pages.map((page) => (
                        <div
                          key={page.title}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={form.pages.includes(page.title)}
                            onChange={() => handlePageSelection(page.title)}
                            style={{ padding: 0 }} // Remove default padding
                          />
                          <span>{page.title}</span>
                        </div>
                      ))}
                    </div>

                    <span className="bookingerror">{formError.pages}</span>
                  </div>

                  <div className="col-md-6 col-lg-6 inputdivs">
                    <label htmlFor="inputImage" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputimagefile}
                      className="form-control"
                      id="inputImage"
                      name="image"
                      onChange={imageUpload}
                    />
                    <span className="bookingerror">{formError.image}</span>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginTop: "10px",
                        }}
                      />
                    )}
                  </div>

                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        display: "flex",
                        margin: "auto",
                        backgroundColor: "rgb(196,222,167)",
                      }}
                    >
                      Add Staff
                    </button>
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

export default Add_Staff;
