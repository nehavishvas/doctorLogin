import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router";
import { ErrorSharp } from "@mui/icons-material";

export const Payment_Update = () => {
  const [form, setForm] = useState({
    patientid: "",
    appointmentno: "",
    amount: "",
    paymentDate: getCurrentDate(),
    paymentStatus: "unpaid",
    paymentmode: "",
  });

  const { PAYMENTMODE } = useContext(AppContext);
  useEffect(() => {
    if (form.paymentmode) {
      PAYMENTMODE(form.paymentmode);
      localStorage.setItem("paymentmode", JSON.stringify(form.paymentmode));
    }
  }, [form.paymentmode]);
  const [formError, setFormError] = useState({
    amount: "",
    paymentDate: "",
    paymentmode: "",
  });

  const navigate = useNavigate();

  const {
    getpatientapi,
    appointmentno,
    patientid,
    doctorfees,
    paymentform,
    generatebill,
    PATIENTIDFORBILL,
  } = useContext(AppContext);

  useEffect(() => {
    if (appointmentno || patientid || doctorfees) {
      setForm({
        ...form,
        appointmentno: appointmentno,
        patientid: patientid,
        amount: doctorfees,
      });

      console.log(` this is appointment no ${appointmentno} `);
    }
  }, [appointmentno, patientid, doctorfees]);

  const [paymentDate, setPaymentDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const validate = () => {
    let isValid = true;
    let errors = {
      amount: "",
      paymentDate: "",
      paymentmode: "",
    };

    if (!form.amount) {
      errors.amount = "Please enter the appointment fees";
      isValid = false;
    } else {
      errors.amount = "";
    }

    if (!form.paymentDate) {
      errors.paymentDate = "Please enter the paymentdate";
      isValid = false;
    } else {
      errors.paymentDate = "";
    }

    if (!form.paymentmode) {
      errors.paymentmode = "Please select the payment mode";
      isValid = false;
    } else {
      errors.paymentmode = "";
    }

    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        patientId: form.patientid,
        amount: form.amount,
        paymentStatus: form.paymentStatus,
        paymentDate: paymentDate,
        paymentMode: form.paymentmode,
      };

      console.log(obj);
      navigate("./Bill_Template");
      PATIENTIDFORBILL(form.patientid);

      // axios
      //   .post(`${medicalUrl}addBillingDetail`, obj)
      //   .then((resp) => {
      //     let billingid = resp.data.data._id;
      //     console.log(` billing id is ${billingid}`);

      //     axios
      //       .post(`${medicalUrl}updatePaymentStatus/${billingid}`)
      //       .then((resp) => {
      //         Swal.fire({
      //           title: "Payment Status Updated Successfully",
      //           icon: "success",
      //           confirmButtonColor: "rgb(41, 75, 147)",
      //           showConfirmButton: true,
      //         });

      //         console.log(resp.data.patientData);

      //         getpatientapi();

      //         navigate("/admin/Payment_Status");
      //       })
      //       .catch((error) => {
      //         Swal.fire({
      //           //  title: "Payment Status Updation Failed",
      //           title: error.response.data.message,
      //           icon: "error",
      //           confirmButtonColor: "rgb(41, 75, 147)",
      //           showConfirmButton: true,
      //         });
      //       });
      //   })
      //   .catch((error) => {
      //     console.error("Error patient registration:", error);
      //     Swal.fire({
      //       title: error.response.data.message,
      //       icon: "error",
      //       showConfirmButton: true,
      //     });
      //   });
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = {
      amount: "",
      paymentDate: "",
    };
    switch (name) {
      case "amount":
        if (!value) {
          errors.amount = "Please enter the amount";
        } else {
          errors.amount = "";
        }
        break;

      case "paymentDate":
        if (!value) {
          errors.paymentDate = "Please enter payment date";
        } else {
          errors.paymentDate = "";
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
              <h5 className="addpatient">Payment Status Update</h5>
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
                  <h5 className="emergencycontactdetails">Payment Details</h5>

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
                    />
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointeddoctor" className="form-label">
                      Appointment Fees
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      id="appointeddoctor"
                      placeholder="Enter Appointment Fees"
                      value={form.amount}
                      onChange={handlechange}
                      disabled={true}
                    />
                    <span className="bookingerror">{formError.amount}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="paymentdate" className="form-label">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="paymentDate"
                      id="paymentdate"
                      value={paymentDate}
                      // onChange={handlechange}
                      disabled={true}
                    />
                    <span className="bookingerror">
                      {formError.paymentDate}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="paymentmode" className="form-label">
                      Payment Mode
                    </label>
                    <select
                      id="paymentmode"
                      className="form-select"
                      onChange={handlechange}
                      value={form.paymentmode}
                      name="paymentmode"
                    >
                      <option disabled value="" selected>
                        Select Payment Mode
                      </option>
                      <option value="cash">Cash</option>
                      <option value="netBanking">Net Banking</option>
                      <option value="debitCard">Debit Card</option>
                      <option value="creditCard">Credit Card</option>
                    </select>
                    <span className="bookingerror">
                      {formError.paymentmode}
                    </span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit">Bill Generate</button>
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
