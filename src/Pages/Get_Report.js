import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AppContext } from "../context";
import moment from "moment";
import { pdfurl } from "../BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";

export const Get_Report = () => {
  const { getreport } = useContext(AppContext);
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (getreport) {
      setReportData(getreport);
      console.log(getreport);
    }
  }, [getreport]);

  const generatePDF = () => {
    // Show the processing alert
    const swalInstance = Swal.fire({
      title: "Processing...",
      text: "Please wait while we generate the report",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // Capture the HTML content
    html2canvas(document.getElementById("bill-content")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("report.pdf");
      swalInstance.close();
    });
  };

  const openPDF = (filename) => {
    window.open(`${pdfurl}${filename}`, "_blank");
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
          Get Report
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
                  <strong>Name&nbsp; :</strong> {reportData.firstName}&nbsp;
                  {reportData.lastName} <br />
                  <strong>Phone&ensp;:</strong> {reportData.phone_no} <br />
                  <strong>Email&ensp;&ensp;:</strong> {reportData.email} <br />
                </p>
              </div>

              <hr />

              <div style={{ marginRight: "23px" }}>
                <h4>Appointment Details</h4>
                <p>
                  <strong>Appointment Number&nbsp;:</strong>{" "}
                  {reportData.appointmentNo}
                  <br />
                  <strong>Appointment Date&nbsp;: </strong>
                  {reportData.appointmentDate
                    ? moment(reportData.appointmentDate).format("MMMM D, YYYY")
                    : "_"}
                  <br />
                  <strong>Appointed Doctor&nbsp;:</strong>{" "}
                  {reportData.doctorName}
                  <br />
                  <strong>
                    Disease
                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </strong>{" "}
                  {reportData.diseaseName}
                </p>
              </div>
            </div>

            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>Patient Personal Details</h4>
                <p>
                  <strong>Street&ensp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>{" "}
                  {reportData.address?.street || "_"}
                  <br />
                  <strong>
                    City&ensp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </strong>{" "}
                  {reportData.address?.city || "_"},&nbsp;
                  {reportData.address?.zip || "_"}
                  <br />
                  <strong>
                    State&ensp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </strong>{" "}
                  {reportData.address?.state || "_"}
                  <br />
                  <strong>Country&ensp;:</strong>{" "}
                  {reportData.address?.country || "_"}
                </p>
              </div>

              <hr />

              <div>
                <h4>Emergency Contact Details</h4>
                <p>
                  <strong>Name&nbsp;:</strong>{" "}
                  {reportData.emergencyContact?.name || "_"}
                  <br />
                  <strong>Relationship&nbsp;: </strong>
                  {reportData.emergencyContact?.relationship || "_"}
                  <br />
                  <strong>Number&nbsp;:</strong>
                  {reportData.emergencyContact?.phone || "_"}
                </p>
              </div>
            </div>

            <hr />
            <h3>Lab Test Details</h3>
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
                    Test Name
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Test Date
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    Test Report
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {reportData.laboratory && reportData.laboratory.length > 0 ? (
                  reportData.laboratory.map((test, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "8px",
                          maxWidth: "100px",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "8px",
                          minWidth: "250px",
                        }}
                      >
                        {test.labTestName}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "8px",
                          minWidth: "250px",
                        }}
                      >
                        {moment(test.labTestDate).format("MMMM D, YYYY")}
                      </td>
                      <td style={{ border: "1px solid #000", padding: "8px" }}>
                        {test.labReport ? (
                          <IconButton
                            onClick={() => openPDF(test.labReport)}
                            style={{
                              backgroundColor: "rgb(196, 222, 167)",
                              color: "red",
                            }}
                          >
                            <PictureAsPdfIcon />
                          </IconButton>
                        ) : (
                          "NA"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      No lab tests available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div style={{ marginTop: "100px" }}>
              <hr />
              <h3>X-Ray Test Details</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th style={{ border: "1px solid #000", padding: "8px" }}>
                      Sr. No.
                    </th>
                    <th style={{ border: "1px solid #000", padding: "8px" }}>
                      Test Name
                    </th>
                    <th style={{ border: "1px solid #000", padding: "8px" }}>
                      Test Date
                    </th>
                    <th style={{ border: "1px solid #000", padding: "8px" }}>
                      Test Report
                    </th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {reportData.xRay && reportData.xRay.length > 0 ? (
                    reportData.xRay.map((test, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: "8px",
                            maxWidth: "100px",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: "8px",
                            minWidth: "250px",
                          }}
                        >
                          {test.xRayName}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: "8px",
                            minWidth: "250px",
                          }}
                        >
                          {moment(test.xRayDate).format("MMMM D, YYYY")}
                        </td>
                        <td
                          style={{ border: "1px solid #000", padding: "8px" }}
                        >
                          {test.xRayReport ? (
                            <IconButton
                              onClick={() => openPDF(test.xRayReport)}
                              style={{
                                backgroundColor: "rgb(196, 222, 167)",
                                color: "red",
                              }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          ) : (
                            "NA"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        No X-ray tests available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
