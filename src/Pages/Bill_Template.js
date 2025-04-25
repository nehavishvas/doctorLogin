import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AppContext } from "../context";
import moment from "moment";
import axios from "axios";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const Bill_Template = () => {
  const { billdata, getpatientapi, paymentmode, PAYMENTMODE } =
    useContext(AppContext);
  const { dashboard } = useContext(AppContext);
  const [invoiceno, setInvoiceNo] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("paymentmode");

    if (data) {
      let obj = JSON.parse(data);

      PAYMENTMODE(obj);
    }
  }, []);

  useEffect(() => {
    if (dashboard) {
      setInvoiceNo(`M-${dashboard.noPendingPaymentStatus + 1}`);
    }
  }, [dashboard]);

  const [billData, setBillData] = useState({});
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM D, YYYY")
  );
  const navigate = useNavigate();

  const generatePDF = () => {
    // Show the processing alert
    const swalInstance = Swal.fire({
      title: "Processing...",
      text: "Please wait while we generate the bill",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const obj = {
      amount: Number(billData.fees),
      paymentStatus: "paid",
      paymentDate: billData.appointmentDate,
      paymentMode: paymentmode ? paymentmode : "-",
    };

    console.log("billing obj", obj);

    axios
      .post(`${medicalUrl}addBillingDetail/${billData._id}`, obj)
      .then((resp) => {
        let billingid = resp.data.data._id;

        console.log(`billing id is ${billingid}`);

        axios
          .post(`${medicalUrl}updatePaymentStatus/${billingid}`)
          .then(() => {
            navigate("/admin/Payment_Status");

            // Hide the processing alert and show success
            swalInstance.close(); // Close the processing alert

            Swal.fire({
              title: "Bill Generated Successfully",
              icon: "success",
              confirmButtonColor: "rgb(41, 75, 147)",
              showConfirmButton: true,
            });

            const input = document.getElementById("bill-content");

            html2canvas(input, { scale: 2 })
              .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF({
                  orientation: "p", // 'p' for portrait, 'l' for landscape
                  unit: "mm",
                  format: [210, 297], // A4 size in mm
                });

                const imgWidth = 210; // Width of the PDF in mm
                const pageHeight = 297; // Height of the PDF in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                  position -= pageHeight;
                  pdf.addPage();
                  pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    position,
                    imgWidth,
                    imgHeight
                  );
                  heightLeft -= pageHeight;
                }

                pdf.save("bill.pdf");
                console.log(resp.data.patientData);

                getpatientapi();
              })
              .catch((error) => {
                // Handle error during PDF generation
                Swal.fire({
                  title: "PDF Generation Failed",
                  text:
                    error.message ||
                    "An error occurred while generating the PDF.",
                  icon: "error",
                  confirmButtonColor: "rgb(41, 75, 147)",
                  showConfirmButton: true,
                });
              });
          })
          .catch((error) => {
            // Handle error during payment status update
            swalInstance.close(); // Close the processing alert
            Swal.fire({
              title: "Payment Status Update Failed",
              text:
                error.response.data.message ||
                "An error occurred while updating the payment status.",
              icon: "error",
              confirmButtonColor: "rgb(41, 75, 147)",
              showConfirmButton: true,
            });
          });
      })
      .catch((error) => {
        // Handle error during billing detail addition
        swalInstance.close(); // Close the processing alert
        Swal.fire({
          title: "Billing Detail Generate Failed",
          text:
            error.response.data.message ||
            "An error occurred while adding billing details.",
          icon: "error",
          confirmButtonColor: "rgb(41, 75, 147)",
          showConfirmButton: true,
        });
      });
  };

  useEffect(() => {
    if (billdata) {
      setBillData(billdata);
    }
  }, [billdata]);

  console.log("billtemplate", billData);

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
            backgroundColor: "#fff", // Ensure the background is white
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
                  <strong>Name&nbsp; :</strong> {billData.firstName}&nbsp;
                  {billData.lastName} <br></br>
                  <strong>Phone&ensp;:</strong> {billData.phone_no}
                </p>
              </div>

              <hr />

              <div>
                <h4>Appointment Details</h4>
                <p>
                  <strong>Appointment Number&nbsp;:</strong>{" "}
                  {billData.appointmentNo}
                  &nbsp; <br></br>
                  <strong>Appointment Date&nbsp;: </strong>
                  {billData.appointmentDate
                    ? moment(billData.appointmentDate).format("MMMM D, YYYY")
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
              <strong>Invoice No.</strong> {invoiceno}
              <br />
              <strong>Payment Mode : </strong>{" "}
              {paymentmode && paymentmode
                ? paymentmode == "debitCard"
                  ? "Debit Card"
                  : paymentmode == "cash"
                  ? "Cash"
                  : paymentmode == "creditCard"
                  ? "Credit Card"
                  : paymentmode == "netBanking"
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
                    Particulars
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Doctor Name
                  </th>

                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Disease Name
                  </th>

                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Total Amount (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      maxWidth: "100px",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      minWidth: "250px",
                    }}
                  >
                    Appointment Fees
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      minWidth: "250px",
                    }}
                  >
                    {billData.doctorName}
                  </td>

                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      minWidth: "250px",
                    }}
                  >
                    {billData.diseaseName}
                  </td>

                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {billData.fees}
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
