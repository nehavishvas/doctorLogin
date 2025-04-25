import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { useNavigate } from "react-router";

export const Lab_Registration_Form = () => {
  const { LABFORMPASSDATA } = useContext(AppContext);
  const [formList, setFormList] = useState([
    {
      appointmentno: "",
      patientid: "",
      testName: "",
      date: "",
      labReport: null,
      testFees: "",
      paymentMode: "",
    },
  ]);
  const [appointmentNo, setAppointmentNo] = useState("");
  const [patientId, setPatientId] = useState("");

  const [formError, setFormError] = useState([
    {
      testName: "",
      date: "",
      labReport: "",
      testFees: "",
      paymentMode: "",
    },
  ]);

  const navigate = useNavigate();
  const { labformpassdata } = useContext(AppContext);

  useEffect(() => {
    if (labformpassdata) {
      setAppointmentNo(labformpassdata.no);
      setPatientId(labformpassdata.id);
      setFormList((prevFormList) =>
        prevFormList.map((form) => ({
          ...form,
          appointmentno: labformpassdata.no,
          patientid: labformpassdata.id,
        }))
      );
    }
  }, [labformpassdata]);

  const validate = () => {
    let isValid = true;
    let errors = formList.map((form) => ({
      testName: form.testName ? "" : "Please enter the test name",
      date: form.date ? "" : "Please enter the test date",
      labReport: form.labReport ? "" : "Please upload the test report",
      testFees: form.testFees ? "" : "Please enter the test fees",
      paymentMode: form.paymentMode ? "" : "Please enter the payment mode",
    }));

    setFormError(errors);
    if (formList.length === 0) {
      isValid = false;
    }
    return (
      isValid &&
      errors.every((error) => Object.values(error).every((msg) => !msg))
    );
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      LABFORMPASSDATA(formList);

      localStorage.setItem("labformpassdata", JSON.stringify(formList));
      console.log("formList", formList);

      navigate("Lab_Bill_Template");
    } else {
      console.log("please fill all the details in lab registration form");
    }
  };

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    setFormList((prevFormList) =>
      prevFormList.map((form, i) =>
        i === index
          ? { ...form, [name]: name === "labReport" ? files[0] : value }
          : form
      )
    );
    validateField(index, name, value);
  };

  const validateField = (index, name, value) => {
    setFormError((prevErrors) =>
      prevErrors.map((error, i) =>
        i === index
          ? {
              ...error,
              [name]:
                name === "testName"
                  ? value
                    ? ""
                    : "Please enter the test name"
                  : name === "date"
                  ? value
                    ? ""
                    : "Please enter test date"
                  : name === "testFees"
                  ? value
                    ? ""
                    : "Please enter test fees"
                  : name === "paymentMode"
                  ? value
                    ? ""
                    : "Please select the payment mode"
                  : name === "labReport"
                  ? value
                    ? ""
                    : "Please upload the test report"
                  : "",
            }
          : error
      )
    );
  };

  const addField = () => {
    setFormList((prevFormList) => [
      ...prevFormList,
      {
        appointmentno: appointmentNo,
        patientid: patientId,
        testName: "",
        date: "",
        testFees: "",
        labReport: null,
        paymentMode: "",
      },
    ]);
    setFormError((prevErrors) => [
      ...prevErrors,
      { testName: "", date: "", labReport: "", testFees: "", paymentMode: "" },
    ]);
  };

  const removeField = (index) => {
    setFormList((prevFormList) => prevFormList.filter((_, i) => i !== index));
    setFormError((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Laboratory Registration Form</h5>
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
                  <h5 className="emergencycontactdetails">
                    Patient Lab Details
                  </h5>

                  {formList.map((form, index) => (
                    <div key={index} className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-4 inputdivs">
                          <label
                            htmlFor={`inputappointmentno-${index}`}
                            className="form-label"
                          >
                            Appointment No
                          </label>
                          <input
                            type="text"
                            name="appointmentno"
                            className="form-control"
                            id={`inputappointmentno-${index}`}
                            placeholder="Appointment No"
                            value={form.appointmentno}
                            disabled
                          />
                        </div>

                        <div className="col-lg-4 inputdivs">
                          <label
                            htmlFor={`testName-${index}`}
                            className="form-label"
                          >
                            Test Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="testName"
                            id={`testName-${index}`}
                            placeholder="Enter test name"
                            value={form.testName}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span className="bookingerror">
                            {formError[index]?.testName}
                          </span>
                        </div>

                        <div className="col-lg-4 inputdivs">
                          <label
                            htmlFor={`testFees-${index}`}
                            className="form-label"
                          >
                            Test Fees
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="testFees"
                            id={`testFees-${index}`}
                            placeholder="Enter test fees"
                            value={form.testFees}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span className="bookingerror">
                            {formError[index]?.testFees}
                          </span>
                        </div>

                        <div className="col-lg-4 inputdivs">
                          <label
                            htmlFor={`date-${index}`}
                            className="form-label"
                          >
                            Test Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="date"
                            id={`date-${index}`}
                            value={form.date}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span className="bookingerror">
                            {formError[index]?.date}
                          </span>
                        </div>

                        <div className="col-lg-4 inputdivs">
                          <label
                            htmlFor={`labReport-${index}`}
                            className="form-label"
                          >
                            Test Report
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="labReport"
                            id={`labReport-${index}`}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span className="bookingerror">
                            {formError[index]?.labReport}
                          </span>
                        </div>

                        <div className="col-md-12 col-lg-4 inputdivs">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Mode
                          </label>
                          <select
                            id={`paymentMode-${index}`}
                            className="form-select"
                            onChange={(e) => handleChange(index, e)}
                            value={form.paymentMode}
                            name="paymentMode"
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
                            {formError[index]?.paymentMode}
                          </span>
                        </div>

                        <div className="col-lg-12 text-end">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeField(index)}
                          >
                            <i className="bi bi-x-circle"></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button
                        type="button"
                        onClick={addField}
                        style={{ marginRight: "15px", color: "black" }}
                      >
                        Add Another Test
                      </button>
                      <button type="submit" style={{ color: "black" }}>
                        Add Laboratory Details
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
