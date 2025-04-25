import React from "react";
import { useLocation } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Patient_Details = () => {
  const location = useLocation();

  const {
    date_of_birth,
    first_name,

    last_name,
    phone_no,
    alternate_phone_no,
    email,
    gender,
    appointment_date,
    appointment_no,
    weekday,
    appointment_time,
    disease_name,
    address,
    emergency_contact,
    appointed_doctor,
  } = location.state || {};

  return (
    <>
      <div
        style={{
          padding: "15px",
          border: "1px solid gray",
          margin: "15px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            columnGap: "16px",
            marginBottom: "15px",
          }}
        >
          <div>
            <AccountCircleIcon className="icon fs-4 patienticon" />
          </div>
          <div style={{ fontSize: "35px", marginTop: "15px" }}>
            {first_name} {last_name}
          </div>
        </div>
      </div>
    </>
  );
};
