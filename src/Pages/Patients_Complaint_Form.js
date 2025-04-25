import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router";

export const Patients_Complaint_Form = () => {
  const [form, setForm] = useState({
    patientid: "",
    doctorid: "",
    complaint: "",
    appointmentno: "",
    complaintDate: "",
  });

  const [formError, setFormError] = useState({
    amount: "",
    appointmentDate: "",
  });

  const navigate = useNavigate();

  const { complaintform, refreshcomplaintlist, patientlist, getpatientapi } =
    useContext(AppContext);

  useEffect(() => {
    if (complaintform) {
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let day = String(date.getDate()).padStart(2, "0");
      let finaldate = `${year}-${month}-${day}`;

      setForm({
        ...form,
        appointmentno: complaintform.no,
        patientid: complaintform.patientid,
        doctorid: complaintform.doctorid,
        complaintDate: finaldate,
      });
    }
  }, [complaintform]);

  const validate = () => {
    let isValid = true;
    let errors = {
      complaint: "",
    };

    if (!form.complaint) {
      errors.complaint = "Please enter the complaint";
      isValid = false;
    } else {
      errors.complaint = "";
    }

    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        // patientId: form.patientid,
        // doctorId: form.doctorid,
        complaint: form.complaint,
      };

      console.log(obj);

      axios
        .put(`${medicalUrl}updatePatientRegister/${form.patientid}`, obj)
        .then((resp) => {
          Swal.fire({
            title: "Patient Complaint Added Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          () => refreshcomplaintlist();
          getpatientapi();

          getpatientapi();

          navigate("/admin/Patients_Complaint_Mark");
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

    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = {
      complaint: "",
    };
    switch (name) {
      case "complaint":
        if (!value) {
          errors.complaint = "Please enter the complaint";
        } else {
          errors.complaint = "";
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
              <h5 className="addpatient">Add Patients Complaint</h5>
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
                  <h5 className="emergencycontactdetails">Patient Complaint</h5>

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
                      value={form.appointmentno}
                      disabled={true}
                      onChange={handlechange}
                    />
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointeddoctor" className="form-label">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      disabled={true}
                      className="form-control"
                      name="amount"
                      id="appointeddoctor"
                      placeholder="Enter Appointment Fees"
                      value={form.complaintDate}
                      onChange={handlechange}
                    />
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactname"
                      className="form-label"
                    >
                      Complaint
                    </label>
                    <input
                      type="text"
                      name="complaint"
                      className="form-control"
                      id="inputemergencycontactname"
                      placeholder="Enter Complaint"
                      value={form.complaint}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.complaint}</span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Add Complaint
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
