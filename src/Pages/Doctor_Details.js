import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppProvider } from "../context";
export const Doctor_Details = () => {
  const location = useLocation();
  const { name, phone, email, gender, speciality, fees } = location.state || {};

  const { vacationslist, slotslist } = useContext(AppProvider);

  return (
    <>
      <h3 style={{ textAlign: "left", marginTop: "10px", padding: "10px" }}>
        Doctor Details
      </h3>
      <hr />
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          padding: "25px",
        }}
      >
        <div
          style={{
            width: "300px",
            borderRadius: "10px",
            border: "2px solid rgb(195,221,166)",
            height: "150px",
            padding: "10px",
          }}
        >
          <p>
            <AccountCircleIcon className="icon fs-4 usericon" /> {name}
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> {phone}
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> {email}
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table
          cellSpacing={0}
          rules="all"
          className="table table-striped table-bordered table-hover"
          border={1}
          id="tbl_grdOPDTime"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th className="text-center">MONDAY</th>
              <th className="text-center">TUESDAY</th>
              <th className="text-center">WEDNESDAY</th>
              <th className="text-center">THURSDAY</th>
              <th className="text-center">FRIDAY</th>
              <th className="text-center">SATURDAY</th>
              <th className="text-center">SUNDAY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td className="text-center">{mondayTime}</td>
              <td className="text-center">{tuesdayTime}</td>
              <td className="text-center">{wednesdayTime}</td>
              <td className="text-center">{thursdayTime}</td>
              <td className="text-center">{fridayTime}</td>
              <td className="text-center">{saturdayTime}</td>
              <td className="text-center">{sundayTime}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
