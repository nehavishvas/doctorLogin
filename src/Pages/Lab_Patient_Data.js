import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router";

export const Lab_Patient_Data = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    address: { street: "", city: "", state: "", zip: "", country: "" },
    phone: "",
    email: "",
    emergency: {
      emergenceyname: "",
      emergenceyrelationship: "",
      emergenceyphone: "",
    },
    appointmentno: "",
    appointments: {
      appointmentdate: "",
      appointeddoctor: "",
      appointmentfees: "",
      patienthistory: "",
      patientcomplaint: "",
      treatmentcourse: "",
      followup: "",
      recordcheck: "",
      financeAdminNotes: "",
    },
    is_payment: "",
  });

  const [formError, setFormError] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    address: { street: "", city: "", state: "", zip: "", country: "" },
    phone: "",
    email: "",
    emergency: {
      emergenceyname: "",
      emergenceyrelationship: "",
      emergenceyphone: "",
    },
    appointmentno: "",
    appointments: {
      appointmentdate: "",
      appointeddoctor: "",
      appointmentfees: "",
      patienthistory: "",
      patientcomplaint: "",
      treatmentcourse: "",
      followup: "",
      recordcheck: "",
      financeAdminNotes: "",
    },
    is_payment: "",
  });

  const navigate = useNavigate();

  const setError = (path, message) => {
    if (path.includes(".")) {
      const [firstKey, secondKey] = path.split(".");
      setFormError((prevErrors) => ({
        ...prevErrors,
        [firstKey]: {
          ...prevErrors[firstKey],
          [secondKey]: message,
        },
      }));
    } else {
      setFormError((prevErrors) => ({
        ...prevErrors,
        [path]: message,
      }));
    }
  };

  const { patientlist, getpatientapi, appointmentlist, appointmentdata } =
    useContext(AppContext);

  useEffect(() => {
    if (appointmentdata) {
      let date = new Date(appointmentdata.appointment_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const finaldate = `${year}-${month}-${day}`;

      setForm({
        ...form,
        email: appointmentdata.email,
        gender: appointmentdata.gender,
        phone: appointmentdata.phone_no,
        address: { ...form.address, city: appointmentdata.city },
        appointments: { ...form.appointments, appointmentdate: finaldate },
        appointmentno: appointmentdata.appointment_no,
      });
    }
  }, [appointmentdata]);

  const validate = () => {
    let isValid = true;

    const validationChecks = {
      "appointments.appointmentdate": form.appointments.appointmentdate,
      "appointments.treatmentcourse": form.appointments.treatmentcourse,
      "appointments.appointeddoctor": form.appointments.appointeddoctor,
      "appointments.appointmentfees": form.appointments.appointmentfees,
      "appointments.patienthistory": form.appointments.patienthistory,
      "appointments.patientcomplaint": form.appointments.patientcomplaint,
      "appointments.followup": form.appointments.followup,
      "appointments.recordcheck": form.appointments.recordcheck,
      "appointments.financeAdminNotes": form.appointments.financeAdminNotes,
      is_payment: form.is_payment,
      firstname: form.firstname,
      lastname: form.lastname,
      dob: form.dob,
      "address.street": form.address.street,
      "address.state": form.address.state,
      "address.zip": form.address.zip,
      "address.country": form.address.country,
      "address.city": form.address.city,
      email: form.email,
      "emergency.emergenceyname": form.emergency.emergenceyname,
      "emergency.emergenceyrelationship": form.emergency.emergenceyrelationship,
      "emergency.emergenceyphone": form.emergency.emergenceyphone,
      gender: form.gender,
    };

    Object.keys(validationChecks).forEach((key) => {
      const value = validationChecks[key];

      let formattedKey = key;

      // Convert dot notation to readable format
      if (key.includes(".")) {
        const parts = key.split(".");
        formattedKey = parts[parts.length - 1];
        formattedKey = formattedKey.replace(/_/g, " ");
      } else {
        formattedKey = key.replace(/_/g, " ");
      }

      if (!value) {
        setError(
          key,
          `Please enter ${formattedKey.replace(/^\w/, (c) => c.toUpperCase())}`
        );
        isValid = false;
      } else if (key === "email" && !/\S+@\S+\.\S+/.test(value)) {
        setError(key, "Please enter a valid email address");
        isValid = false;
      } else if (key === "emergency.emergenceyphone" && form.phone === value) {
        setError(key, "Emergency phone number must be different");
        isValid = false;
      } else if (key === "emergency.emergenceyphone" && value.length !== 10) {
        setError(key, "Number must be 10 digits");
        isValid = false;
      } else {
        setError(key, "");
      }
    });

    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        firstName: form.firstname,
        lastName: form.lastname,
        dateOfBirth: form.dob,
        gender: form.gender,
        address: {
          street: form.address.street,
          city: form.address.city,
          state: form.address.state,
          country: form.address.country,
          zip: form.address.zip,
        },
        phone_no: form.phone,
        email: form.email,
        emergencyContact: {
          name: form.emergency.emergenceyname,
          phone: form.emergency.emergenceyphone,
          relationship: form.emergency.emergenceyrelationship,
        },

        appointment_no: form.appointmentno,
        appointments: {
          date: form.appointments.appointmentdate,
          doctor: form.appointments.appointeddoctor,
          fees: form.appointments.appointmentfees,
          history: form.appointments.patienthistory,
          complaint: form.appointments.patientcomplaint,
          treatmentCourse: form.appointments.treatmentcourse,
          followUp: form.appointments.followup,
          recordCheck: form.appointments.recordcheck,
          financeAdminNotes: form.appointments.financeAdminNotes,
        },
        is_payment: form.is_payment,
        doctorId: "66a76d59fdc1b63b4d0edbed",
      };

      console.log(obj);

      axios
        .post(`${medicalUrl}patientRegister`, obj)
        .then((resp) => {
          console.log(resp);

          Swal.fire({
            title: "Registration Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          getpatientapi();
          navigate("/admin/Patient_List");
        })
        .catch((error) => {
          console.error("Error patient registration:", error);
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

    if (
      name === "city" ||
      name === "country" ||
      name === "state" ||
      name === "zip" ||
      name === "street"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        address: { ...prevForm.address, [name]: value },
      }));
    } else if (
      name === "emergenceyname" ||
      name === "emergenceyphone" ||
      name === "emergenceyrelationship"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        emergency: { ...prevForm.emergency, [name]: value },
      }));
    } else if (
      name === "appointmentdate" ||
      name === "appointmentfees" ||
      name === "patienthistory" ||
      name === "patientcomplaint" ||
      name === "appointeddoctor" ||
      name === "treatmentcourse" ||
      name === "followup" ||
      name === "recordcheck" ||
      name === "financeAdminNotes"
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        appointments: { ...prevForm.appointments, [name]: value },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Add Patient</h5>
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
                  <h5>Personal Details</h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="First Name"
                      name="firstname"
                      value={form.firstname || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.firstname}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      name="lastname"
                      placeholder="Last Name"
                      value={form.lastname || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.lastname}</span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDateofbirth" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputDateofbirth"
                      name="dob"
                      placeholder="Date of Birth"
                      value={form.dob || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.dob}</span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="selectgender" className="form-label">
                      Select Gender
                    </label>
                    <select
                      id="selectgender"
                      className="form-select"
                      name="gender"
                      onChange={handlechange}
                      value={form.gender || ""}
                      // Remove disabled attribute if not needed
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                    <span className="bookingerror">{formError.gender}</span>
                  </div>

                  <h5 className="addressdetails">Address Details</h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputstreet" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputstreet"
                      name="street"
                      placeholder="Enter Street Name"
                      value={form.address.street || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.address.street}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputcity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputcity"
                      name="city"
                      placeholder="Enter City Name"
                      value={form.address.city || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.address.city}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputstate" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="inputstate"
                      placeholder="Enter State Name"
                      value={form.address.state || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.address.state}
                    </span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label htmlFor="inputzipcode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zip"
                      className="form-control"
                      id="inputzipcode"
                      placeholder="Enter Zip Code"
                      value={form.address.zip || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.address.zip}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputcountry" className="form-label">
                      Country Name
                    </label>
                    <input
                      name="country"
                      type="text"
                      className="form-control"
                      id="inputcountry"
                      placeholder="Enter Country Name"
                      value={form.address.country || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.address.country}
                    </span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      id="inputPhone"
                      placeholder="Phone"
                      value={form.phone || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.phone}</span>
                  </div>

                  <div className="col-md-6 col-lg-4 inputdivs">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={form.email || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.email}</span>
                  </div>

                  <h5 className="emergencycontactdetails">
                    Emergency Contact Details
                  </h5>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactname"
                      className="form-label"
                    >
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergenceyname"
                      className="form-control"
                      id="inputemergencycontactname"
                      placeholder="Enter Emergency Contact Name"
                      value={form.emergency.emergenceyname || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergency.emergenceyname}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactrelationship"
                      className="form-label"
                    >
                      Emergency Contact Relationship
                    </label>
                    <input
                      name="emergenceyrelationship"
                      type="text"
                      className="form-control"
                      id="inputemergencycontactrelationship"
                      placeholder="Enter Emergency Contact Relationship"
                      value={form.emergency.emergenceyrelationship || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergency.emergenceyrelationship}
                    </span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactphone"
                      className="form-label"
                    >
                      Emergency Contact Phone
                    </label>
                    <input
                      type="number"
                      name="emergenceyphone"
                      className="form-control"
                      id="inputemergencycontactphone"
                      placeholder="Enter Emergency Phone Number"
                      value={form.emergency.emergenceyphone || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergency.emergenceyphone}
                    </span>
                  </div>

                  <h5 className="emergencycontactdetails">
                    Appointment Details
                  </h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputappointmentno" className="form-label">
                      Appointment No
                    </label>
                    <input
                      type="text"
                      name="appointmentno"
                      className="form-control"
                      id="inputappointmentno"
                      placeholder="Appointment No"
                      value={form.appointmentno || ""}
                      onChange={handlechange}
                      // Remove disabled attribute if not needed
                    />
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDate" className="form-label">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="appointmentdate"
                      id="inputDate"
                      placeholder="Appointment Date"
                      value={form.appointments.appointmentdate || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.appointments.appointmentdate}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointeddoctor" className="form-label">
                      Appointed Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="appointeddoctor"
                      id="appointeddoctor"
                      placeholder="Appointed Doctor Name"
                      value={form.appointments.appointeddoctor || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.appointments.appointeddoctor}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointmentfees" className="form-label">
                      Appointment Fees
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="appointmentfees"
                      placeholder="Enter Appointment Fees"
                      value={form.appointments.appointmentfees || ""}
                      name="appointmentfees"
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.appointments.appointmentfees}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputhistory" className="form-label">
                      History
                    </label>
                    <input
                      id="inputhistory"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.patienthistory || ""}
                      type="text"
                      name="patienthistory"
                    />
                    <span className="bookingerror">
                      {formError.appointments.patienthistory}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputcomplaint" className="form-label">
                      Complaint
                    </label>
                    <input
                      id="inputcomplaint"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.patientcomplaint || ""}
                      type="text"
                      name="patientcomplaint"
                    />
                    <span className="bookingerror">
                      {formError.appointments.patientcomplaint}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputtreatmentcourse"
                      className="form-label"
                    >
                      Treatment Course Name
                    </label>
                    <input
                      name="treatmentcourse"
                      id="inputtreatmentcourse"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.treatmentcourse || ""}
                      type="text"
                    />
                    <span className="bookingerror">
                      {formError.appointments.treatmentcourse}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputfollowup" className="form-label">
                      Follow Up
                    </label>
                    <input
                      id="inputfollowup"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.followup || ""}
                      type="text"
                      name="followup"
                    />
                    <span className="bookingerror">
                      {formError.appointments.followup}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputrecordcheck" className="form-label">
                      Record Check
                    </label>
                    <input
                      id="inputrecordcheck"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.recordcheck || ""}
                      type="text"
                      name="recordcheck"
                    />
                    <span className="bookingerror">
                      {formError.appointments.recordcheck}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputfinanceadminnotes"
                      className="form-label"
                    >
                      Finance Admin Notes
                    </label>
                    <input
                      id="inputfinanceadminnotes"
                      name="financeAdminNotes"
                      className="form-control"
                      onChange={handlechange}
                      value={form.appointments.financeAdminNotes || ""}
                      type="text"
                    />
                    <span className="bookingerror">
                      {formError.appointments.financeAdminNotes}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="selectpaymentstatus" className="form-label">
                      Payment Status
                    </label>
                    <select
                      id="selectpaymentstatus"
                      name="is_payment"
                      className="form-select"
                      onChange={handlechange}
                      value={form.is_payment || ""}
                    >
                      <option value="" disabled>
                        Select Payment Status
                      </option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                    <span className="bookingerror">{formError.is_payment}</span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit">
                        Add Patient <i className="fa fa-arrow-right" />
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
