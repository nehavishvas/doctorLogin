import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AppContext } from "../context";
import moment from "moment";
import axios from "axios";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const Lab_Bill_Template = () => {
  const {
    getpatientapi,
    patientlist,
    dashboard,
    labformpassdata,
    labreportupload,
  } = useContext(AppContext);

  const [invoiceno, setInvoiceNo] = useState("");
  const [formdataList, setFormdataList] = useState([]);
  const [patient, setPatient] = useState({});
  const [totalFees, setTotalFees] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM D, YYYY")
  );
  const navigate = useNavigate();
  const [paymentmethod, setPaymentMethod] = useState();

  useEffect(() => {
    if (dashboard) {
      setInvoiceNo(`L-${dashboard.noLabPatient + 1}`);
    }
  }, [dashboard]);

  useEffect(() => {
    if (Array.isArray(labformpassdata) && labformpassdata.length > 0) {
      const formDataList = labformpassdata.map((form) => ({
        labTestName: form.testName,
        labTestFees: form.testFees,
        labTestDate: form.date,
        paymentMode: form.paymentMode,
        labReport: form.labReport,
      }));

      setPaymentMethod(labformpassdata[0].paymentMode);
      setFormdataList(formDataList);

      const total = formDataList.reduce(
        (sum, form) => sum + parseFloat(form.labTestFees),
        0
      );
      setTotalFees(total);

      const patientid = labformpassdata[0]?.patientid;
      if (patientid && Array.isArray(patientlist)) {
        const patientObj = patientlist.find((e) => e._id === patientid);
        setPatient(patientObj || {});
      }
    }
  }, [labformpassdata, patientlist]);

  const generatePDF = () => {
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we generate the bill",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // Ensure formdataList is an array before proceeding
    if (!Array.isArray(formdataList) || formdataList.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "No data available to generate the bill.",
        icon: "error",
        confirmButtonColor: "rgb(41, 75, 147)",
      });
      return;
    }

    // Create an array of promises for API requests
    const requests = formdataList.map((form, index) => {
      const formData = new FormData();

      formData.append("labTestName", form.labTestName);
      formData.append("labTestDate", form.labTestDate);
      formData.append("labFees", form.labTestFees);

      if (form.labReport instanceof File) {
        formData.append("labReport", form.labReport);
      } else {
        return Swal.fire({
          title: "Error!",
          text: "Invalid lab report file.",
          icon: "error",
          confirmButtonColor: "rgb(41, 75, 147)",
        }).then(() => Promise.reject(new Error("Invalid lab report file")));
      }

      return axios.post(
        `${medicalUrl}addDiagnosticReport/${patient._id}`,
        formData
      );
    });

    // Use Promise.all to handle all requests
    Promise.all(requests)
      .then(() => {
        const input = document.getElementById("bill-content");
        return html2canvas(input, { scale: 2 });
      })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(`Lab_Bill_${patient.firstName}.pdf`);

        Swal.fire({
          title: "Bill Generated Successfully",
          icon: "success",
          confirmButtonColor: "rgb(41, 75, 147)",
          showConfirmButton: true,
        });

        getpatientapi();
        navigate("/admin/Lab_Patients_Form");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.response ? err.response.data.message : "An error occurred",
          icon: "error",
          confirmButtonColor: "rgb(41, 75, 147)",
        });
      });
  };

  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "rgb(196, 222, 167)",
            position: "absolute",
            right: "38%",
            top: "18px",
          }}
          onClick={generatePDF}
        >
          Generate Bill
        </button>
        <div
          id="bill-content"
          style={{
            padding: "20px",
            pageBreakAfter: "always",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ border: "1px solid #000", padding: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <h2>WebnmobApps Hospital</h2>
              <p style={{ marginBottom: "0px" }}>
                Address: B-36, Sector 59, Noida
              </p>
              <p>Contact: 9999999999</p>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>Patient Information</h4>
                <p>
                  <strong>Name&nbsp; :</strong> {patient?.firstName}&nbsp;
                  {patient?.lastName} <br />
                  <strong>Phone&ensp;:</strong> {patient?.phone_no}
                </p>
              </div>
              <hr />
              <div>
                <h4>Appointment Details</h4>
                <p>
                  <strong>Appointment Number&nbsp;:</strong>{" "}
                  {patient?.appointmentNo}
                  &nbsp; <br />
                  <strong>Appointment Date&nbsp;: </strong>
                  {patient?.appointmentDate
                    ? moment(patient.appointmentDate).format("MMMM D, YYYY")
                    : "_"}
                </p>
              </div>
            </div>
            <hr />
            <h3>Invoice Details</h3>
            <p>
              <strong>Invoice Date</strong>&nbsp;:&nbsp;
              {currentDate}
              <br />
              <strong>Invoice No.</strong> {labreportupload + 1}
              <br />
              <strong>Payment Mode : </strong>{" "}
              {paymentmethod && paymentmethod
                ? paymentmethod === "debitCard"
                  ? "Debit Card"
                  : paymentmethod === "cash"
                  ? "Cash"
                  : paymentmethod === "creditCard"
                  ? "Credit Card"
                  : paymentmethod === "netBanking"
                  ? "Net Banking"
                  : "-"
                : "-"}
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Sr. No.
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Lab Test Name
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Test Date
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Test Fees (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {formdataList.length > 0 &&
                  formdataList.map((form, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #000", padding: "8px" }}>
                        {index + 1}
                      </td>
                      <td style={{ border: "1px solid #000", padding: "8px" }}>
                        {form.labTestName}
                      </td>
                      <td style={{ border: "1px solid #000", padding: "8px" }}>
                        {moment(form.labTestDate).format("MMMM D, YYYY")}
                      </td>
                      <td style={{ border: "1px solid #000", padding: "8px" }}>
                        {form.labTestFees}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      border: "1px solid #000",
                    }}
                  >
                    <strong>Total Fees</strong>
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    <strong>{totalFees} Rs.</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: "100px" }}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "80px",
                }}
              >
                We pray that you will recover soon <br /> Thanks for coming
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <div>
                  <h4>Signature</h4>
                  <p style={{ marginTop: "80px" }}>
                    .............................................................
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
