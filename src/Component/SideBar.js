import React, { useState, useEffect, useContext, useRef } from "react";
import "./SideBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentIcon from "@mui/icons-material/Payment";
import Timeline from "@mui/icons-material/Timeline";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { medicalImageUrl } from "../BaseUrl/BaseUrl";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BlindIcon from "@mui/icons-material/Blind";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ScienceIcon from "@mui/icons-material/Science";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp";
import MobileFriendlySharpIcon from "@mui/icons-material/MobileFriendlySharp";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AppContext } from "../context";
import DoneIcon from "@mui/icons-material/Done";
import AdminImage from "../../src/img/medicallogo.jpeg";

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children }) {
  const location = useLocation(); // Get the current location

  const getActiveKey = () => {
    const path = location.pathname;

    switch (path) {
      case "/admin":
        return ""; // Use the localStorage value if available, otherwise, use an empty string

      case "/admin/Patient_List":
        return "Patient_List";
      case "/admin/Patient_List/Patient_Registration":
        return "Patient_List";

      case "/admin/Patient_List/Update_Patient_Details":
        return "Patient_List";

      case "/admin/Appointment_List":
        return "Appointment_List";

      case "/admin/Appointment_List/AppointmentBooking":
        return "Appointment_List";

      case "/admin/Risk_Assessment_Form":
        return "Risk_Assessment_Form";

      case "/admin/Confirmed_Appointments":
        return "Confirmed_Appointments";

      case "/admin/Confirmed_Appointments/Patient_Registration":
        return "Confirmed_Appointments";
      case "/admin/Today_Appointment":
        return "Today_Appointment";

      case "/admin/Payment_Status":
        return "Payment_Status";

      case "/admin/Payment_Status/Payment_Update":
        return "Payment_Status";

      case "/admin/Payment_Status/Payment_Update/Bill_Template":
        return "Payment_Status";

      case "/admin/Mark_Appointment":
        return "Mark_Appointment";

      case "/admin/Upcoming_Appointments":
        return "Upcoming_Appointments";

      case "/admin/Completed_Appointments":
        return "Completed_Appointments";
      case "/admin/Appointment_Completed":
        return "Appointment_Completed";

      case "/admin/Diagnostic_Patient":
        return "Diagnostic_Patient";

      case "/admin/Mark_Patient_Type":
        return "Mark_Patient_Type";

      case "/admin/Active_Patients":
        return "Active_Patients";

      case "/admin/Recovered_Patients":
        return "Recovered_Patients";

      case "/admin/Treatment_Courses":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Update_Course":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Display_Session/Update_Session":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Display_Session":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Display_Session/Add_Session":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Treatment_Details/Session_Details":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses/Treatment_Details":
        return "Treatment_Courses";

      case "/admin/Treatment_Courses":
        return "Treatment_Courses";

      case "/admin/Patient_Flow":
        return "Patient_Flow";

      case "/admin/My_Schedule":
        return "My_Schedule";
      case "/admin/My_Schedule/Add_Slot":
        return "My_Schedule";

      case "/admin/My_Schedule/Change_Doctor_Password":
        return "My_Schedule";

      case "/admin/My_Appointments":
        return "My_Appointments";

      case "/admin/Treatment_Courses/Add_Course":
        return "Treatment_Courses";

      case "/admin/Patients_Complaint_Mark":
        return "Patients_Complaint_Mark";

      case "/admin/Patients_Complaint_Mark/Patients_Complaint_Form":
        return "Patients_Complaint_Mark";

      case "/admin/Patients_Complaint_List":
        return "Patients_Complaint_List";

      case "/admin/Lab_Patients_Mark":
        return "Lab_Patients_Mark";

      case "/admin/Lab_Patients_Form":
        return "Lab_Patients_Form";

      case "/admin/Lab_Patients_Form/Lab_Registration_Form":
        return "Lab_Patients_Form";

      case "/admin/Lab_Patients_Form/Lab_Registration_Form/Lab_Bill_Template":
        return "Lab_Patients_Form";

      case "/admin/X_Ray_Patients_Form":
        return "X_Ray_Patients_Form";

      case "/admin/X_Ray_Patients_Form/X_Ray_Registration_Form":
        return "X_Ray_Patients_Form";

      case "/admin/Lab_Report_Upload":
        return "Lab_Report_Upload";
      case "/admin/Lab_Patient_List":
        return "Lab_Patient_List";

      case "/admin/X_Ray_Patient_List":
        return "X_Ray_Patient_List";

      case "/admin/Today_Lab_Test":
        return "Today_Lab_Test";

      case "/admin/Today_X_Ray_Test":
        return "Today_X_Ray_Test";

      case "/admin/Staff_List":
        return "Staff_List";

      case "/admin/Staff_List/Add_Staff":
        return "Staff_List";

      case "/admin/Staff_List/Update_Staff":
        return "Staff_List";

      case "/admin/Doctors_List":
        return "Doctors_List";

      case "/admin/Doctors_List/Doctors_Staff":
        return "Doctors_List";

      case "/admin/Doctors_List/Change_Doctor_Password":
        return "Doctors_List";

      case "/admin/Doctors_List/Update_Doctor_Details":
        return "Update_Doctor_List";

      case "/admin/Doctors_List/Add_Slot":
        return "Doctors_List";

      case "/admin/Doctors_List/Add_Vacations":
        return "Doctors_List";

      case "/admin/Doctors_List/Doctor_Details":
        return "Doctors_List";
      case "/admin/Basic_Reports":
        return "Basic_Reports";

      case "/admin/Display_Condition_Category/Condition_Category":
        return "Display_Condition_Category";

      case "/admin/Display_Condition_Category/Update_Condition_Category":
        return "Display_Condition_Category";

      case "/admin/Display_Condition_Category":
        return "Display_Condition_Category";

      case "/admin/Sub_Category":
        return "Sub_Category";

      case "/admin/Display_Sub_Category":
        return "Display_Sub_Category";
      case "/admin/Display_Sub_Category/Update_Sub_Category":
        return "Display_Sub_Category";

      case "/admin/Display_Sub_Category/Sub_Category":
        return "Display_Sub_Category";

      case "/admin/Appointments_Per_Day":
        return "Appointments_Per_Day";
      case "/admin/Basic_Reports/Get_Report":
        return "Basic_Reports";

      default:
        return "";
    }
  };

  // const getActiveKey = () => {
  //   const path = location.pathname;

  //   const pathToKeyMap = {
  //     "/admin": "",
  //     "/admin/Patient_List": "Patient_List",
  //     "/admin/Patient_List/Patient_Registration": "Patient_List",
  //     "/admin/Patient_List/Update_Patient_Details": "Patient_List",
  //     "/admin/Appointment_List": "Appointment_List",
  //     "/admin/Appointment_List/AppointmentBooking": "Appointment_List",
  //     "/admin/Risk_Assessment_Form": "Risk_Assessment_Form",
  //     "/admin/Confirmed_Appointments": "Confirmed_Appointments",
  //     "/admin/Confirmed_Appointments/Patient_Registration":
  //       "Confirmed_Appointments",
  //     "/admin/Today_Appointment": "Today_Appointment",
  //     "/admin/Payment_Status": "Payment_Status",
  //     "/admin/Payment_Status/Payment_Update": "Payment_Status",
  //     "/admin/Payment_Status/Payment_Update/Bill_Template": "Payment_Status",
  //     "/admin/Mark_Appointment": "Mark_Appointment",
  //     "/admin/Upcoming_Appointments": "Upcoming_Appointments",
  //     "/admin/Completed_Appointments": "Completed_Appointments",
  //     "/admin/Appointment_Completed": "Appointment_Completed",
  //     "/admin/Diagnostic_Patient": "Diagnostic_Patient",
  //     "/admin/Mark_Patient_Type": "Mark_Patient_Type",
  //     "/admin/Active_Patients": "Active_Patients",
  //     "/admin/Recovered_Patients": "Recovered_Patients",
  //     "/admin/Treatment_Courses": "Treatment_Courses",
  //     "/admin/Treatment_Courses/Update_Course": "Treatment_Courses",
  //     "/admin/Treatment_Courses/Display_Session": "Treatment_Courses",
  //     "/admin/Treatment_Courses/Display_Session/Update_Session":
  //       "Treatment_Courses",
  //     "/admin/Treatment_Courses/Display_Session/Add_Session":
  //       "Treatment_Courses",
  //     "/admin/Treatment_Courses/Treatment_Details/Session_Details":
  //       "Treatment_Courses",
  //     "/admin/Treatment_Courses/Treatment_Details": "Treatment_Courses",
  //     "/admin/Treatment_Courses/Add_Course": "Treatment_Courses",
  //     "/admin/Patient_Flow": "Patient_Flow",
  //     "/admin/My_Schedule": "My_Schedule",
  //     "/admin/My_Schedule/Add_Slot": "My_Schedule",
  //     "/admin/My_Schedule/Change_Doctor_Password": "My_Schedule",
  //     "/admin/My_Appointments": "My_Appointments",
  //     "/admin/Patients_Complaint_Mark": "Patients_Complaint_Mark",
  //     "/admin/Patients_Complaint_Mark/Patients_Complaint_Form":
  //       "Patients_Complaint_Mark",
  //     "/admin/Patients_Complaint_List": "Patients_Complaint_List",
  //     "/admin/Lab_Patients_Mark": "Lab_Patients_Mark",
  //     "/admin/Lab_Patients_Form": "Lab_Patients_Form",
  //     "/admin/Lab_Patients_Form/Lab_Registration_Form": "Lab_Patients_Form",
  //     "/admin/Lab_Patients_Form/Lab_Registration_Form/Lab_Bill_Template":
  //       "Lab_Patients_Form",
  //     "/admin/X_Ray_Patients_Form": "X_Ray_Patients_Form",
  //     "/admin/X_Ray_Patients_Form/X_Ray_Registration_Form":
  //       "X_Ray_Patients_Form",
  //     "/admin/Lab_Report_Upload": "Lab_Report_Upload",
  //     "/admin/Lab_Patient_List": "Lab_Patient_List",
  //     "/admin/X_Ray_Patient_List": "X_Ray_Patient_List",
  //     "/admin/Today_Lab_Test": "Today_Lab_Test",
  //     "/admin/Today_X_Ray_Test": "Today_X_Ray_Test",
  //     "/admin/Staff_List": "Staff_List",
  //     "/admin/Staff_List/Add_Staff": "Staff_List",
  //     "/admin/Staff_List/Update_Staff": "Staff_List",
  //     "/admin/Doctors_List": "Doctors_List",
  //     "/admin/Doctors_List/Doctors_Staff": "Doctors_List",
  //     "/admin/Doctors_List/Change_Doctor_Password": "Doctors_List",
  //     "/admin/Doctors_List/Update_Doctor_Details": "Update_Doctor_List",
  //     "/admin/Doctors_List/Add_Slot": "Doctors_List",
  //     "/admin/Doctors_List/Add_Vacations": "Doctors_List",
  //     "/admin/Doctors_List/Doctor_Details": "Doctors_List",
  //     "/admin/Basic_Reports": "Basic_Reports",
  //     "/admin/Display_Condition_Category/Condition_Category":
  //       "Display_Condition_Category",
  //     "/admin/Display_Condition_Category/Update_Condition_Category":
  //       "Display_Condition_Category",
  //     "/admin/Display_Condition_Category": "Display_Condition_Category",
  //     "/admin/Sub_Category": "Sub_Category",
  //     "/admin/Display_Sub_Category": "Display_Sub_Category",
  //     "/admin/Display_Sub_Category/Update_Sub_Category": "Display_Sub_Category",
  //     "/admin/Display_Sub_Category/Sub_Category": "Display_Sub_Category",
  //     "/admin/Appointments_Per_Day": "Appointments_Per_Day",
  //     "/admin/Basic_Reports/Get_Report": "Basic_Reports",
  //   };

  //   return pathToKeyMap[path] || "";
  // };

  const [collapsed, setCollapsed] = useState(false);
  const { MyProfile } = useContext(AppContext);

  const [image, setImage] = useState("");
  useEffect(() => {
    if (MyProfile) {
      setImage(MyProfile.profileImage);
    }
  }, [MyProfile]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const signoutData = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuStyle = {
    background: "#C4DEA7",
    color: "white",
    height: "100vh",
    overflow: "auto",
    scrollbarWidth: "none",
  };

  const [adminImage, setAdminImage] = useState({});

  const [selectedKey, setSelectedKey] = useState(getActiveKey());

  useEffect(() => {
    // const storedPath = localStorage.getItem("activePath");
    // storedPath
    //   ? setSelectedKey(getActiveKey())
    //   : setSelectedKey(getActiveKey());
    setSelectedKey(getActiveKey());
    // localStorage.setItem("activePath", location.pathname);
    console.log(location.pathname, "this is location");
  }, [location]);

  // useEffect(() => {
  //   const storedPath = localStorage.getItem("activePath");
  //   if (storedPath) {
  //     setSelectedKey(getActiveKey(storedPath));
  //   }
  // }, []);

  const sidebarPages = [
    {
      key: "",
      icon: <AiOutlineDashboard className="fs-4" />,
      label: "Dashboard",
    },

    {
      key: "My_Schedule",
      icon: <MedicalServicesIcon className="icon fs-4" />,
      label: "My Schedule",
    },
    {
      key: "My_Appointments",
      icon: <AccountCircleIcon className="icon fs-4" />,
      label: "My Appointments",
    },

    {
      key: "Treatment_Courses",
      icon: <GroupIcon className="icon fs-4" />,
      label: "Treatment Course",
    },
    // {
    //   key: "Appointment_List",
    //   icon: <EventIcon className="icon fs-4" />,
    //   label: "Appointment List",
    // },

    // {
    //   key: "Staff_List",
    //   icon: <AccountCircleIcon className="icon fs-4" />,
    //   label: "Staff List",
    // },
    // {
    //   key: "Doctors_List",
    //   icon: <MedicalServicesIcon className="icon fs-4" />,
    //   label: "Doctor List",
    // },
    // {
    //   key: "Patient_List",
    //   icon: <GroupIcon className="icon fs-4" />,
    //   label: "Patient Registration",
    // },
    // {
    //   key: "Appointment_List",
    //   icon: <EventIcon className="icon fs-4" />,
    //   label: "Appointment List",
    // },

    // {
    //   key: "Display_Condition_Category",
    //   icon: <PaymentIcon className="icon fs-4" />,
    //   label: "Condition Category",
    // },

    // {
    //   key: "Display_Sub_Category",
    //   icon: <AssessmentIcon className="icon fs-4" />,
    //   label: "Sub Category",
    // },

    // {
    //   key: "Treatment_Courses",
    //   icon: <MedicalServicesOutlinedIcon className="icon fs-4" />,
    //   label: "Treatment Course",
    // },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="custom-slider"
        style={{
          maxHeight: "100vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo"></span>
            <span className="lg-logo">
              <img
                src={AdminImage}
                className="festabash-l0go mb-3 imageinsidebar"
                alt=""
                style={{
                  height: "auto",
                  width: "100%",
                  paddingLeft: "10px",
                  paddingRight: "10px",

                  objectFit: "contain",
                  // marginBottom: "0px",
                }}
              />
            </span>
          </h2>
        </div>
        <Menu
          mode="inline"
          style={menuStyle}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key === "signout") {
              signoutData();
            } else {
              navigate(key);
              setSelectedKey(key);
            }
          }}
          items={sidebarPages}
          // items={sidebarPages
          //   .filter((item) => {
          //     // Check if the user is an Admin or if the page is in MyProfile.pages
          //     if (MyProfile.role === "Admin") return true; // Admins can see all pages
          //     return MyProfile.pages?.includes(item.key); // Only show items in MyProfile.pages for non-admin roles
          //   })
          //   .map((e) => ({
          //     key: e.key,
          //     icon: e.icon,
          //     label: e.label,
          //   }))}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollbarWidth: "normal",
        }}
      >
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: 30,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <img
                  style={{ borderRadius: "50%" }}
                  width={32}
                  height={32}
                  src={`${medicalImageUrl}${image}`}
                  alt=""
                /> */}
                <div>
                  <h5 className="mb-0">{MyProfile && MyProfile.name}</h5>
                </div>
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <NavLink
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/MyProfile"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/Change_Password"
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={signoutData}
                  >
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>

        <Content
          className="contentlayout"
          style={{
            margin: "24px 16px",
            overflow: "scroll",
            scrollbarWidth: "none",
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />

          <Footer
            style={{
              textAlign: "center",
              marginTop: "200px",
            }}
          >
            Hospital Admin Panel ©2024 Created by Admin
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
