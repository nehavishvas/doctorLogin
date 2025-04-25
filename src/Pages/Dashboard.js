import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import ApexChart from "./ApexChart";
import { NavLink } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";

import { AppContext } from "../context";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export default function Dashboard() {
  const { dashboard } = useContext(AppContext);

  const { totalappointment } = useContext(AppContext);

  // const [length, setLength] = useState({});

  // useEffect(() => {
  //   if (dashboard) {
  //     setLength(dashboard);
  //   }
  // }, [dashboard]);

  return (
    <>
      <div className="">
        <div className="row">
          <div className="cards">
            {/* <NavLink to="Staff_List">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">
                    {length.noStaff ? length.noStaff : 0}
                  </div>
                  <div className="card-name">Total Staff</div>
                </div>
                <div className="icon-box">
                  <AccountCircleIcon className="icon" />
                </div>
              </div>
            </NavLink> */}
            {/*
            <NavLink to="Doctors_List">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noDoctors}</div>
                  <div className="card-name">Total Doctors</div>
                </div>
                <div className="icon-box">
                  <MedicalServicesIcon className="icon" />
                </div>
              </div>
            </NavLink> */}

            <NavLink to="My_Appointments">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">
                    {totalappointment ? totalappointment : 0}
                  </div>
                  <div className="card-name">Total Appointments</div>
                </div>
                <div className="icon-box">
                  <EventIcon className="icon" />
                </div>
              </div>
            </NavLink>
            {/* <NavLink to="Patient_List">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noPatient}</div>
                  <div className="card-name">Total Patients</div>
                </div>
                <div className="icon-box">
                  <GroupIcon className="icon" />
                </div>
              </div>
            </NavLink> */}

            {/* <NavLink to="Payment_Status">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noPendingPaymentStatus}</div>
                  <div className="card-name">Total Fees Paid Patients</div>
                </div>
                <div className="icon-box">
                  <PaymentIcon className="icon" />
                </div>
              </div>
            </NavLink> */}

            {/* <NavLink to="Patients_Complaint_List">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noPatientComplaint}</div>
                  <div className="card-name">Total Patients Complaints</div>
                </div>
                <div className="icon-box">
                  <ReportProblemOutlinedIcon className="icon" />
                </div>
              </div>
            </NavLink> */}

            {/* <NavLink to="Lab_Patients_Mark">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noLabPatient}</div>
                  <div className="card-name">Total Lab Patients</div>
                </div>
                <div className="icon-box">
                  <FormatListBulletedIcon className="icon" />
                </div>
              </div>
            </NavLink> */}

            {/* <NavLink to="Lab_Patients_Mark">
              <div className="dashboard-card">
                <div className="card-content">
                  <div className="number">{length.noXrayPatient}</div>
                  <div className="card-name">Total X-Ray Patients</div>
                </div>
                <div className="icon-box">
                  <FormatListBulletedIcon className="icon" />
                </div>
              </div>
            </NavLink> */}
          </div>
        </div>

        <div className="dashboardchart">
          <ApexChart />
        </div>
      </div>
    </>
  );
}
