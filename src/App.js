import "./App.css";
import Main from "./Component/SideBar";
import { BrowserRouter } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Page/SuperAdminLogin/Login";
import Protected from "../src/Component/Protected";
import MyProfile from "./Page/SuperAdminLogin/MyProfile";

import Contact_List from "./Pages/Contact_List";
import Booking_List from "./Pages/Booking_List";
import { Forgot } from "./Page/Forgot";
import Change_Password from "./Pages/Change_Password";
import Footer_Details from "./Pages/Footer_Details";
import Patient_List from "./Pages/Patient_List";
import Appointment_List from "./Pages/Appointment_List";
import Today_Appointment from "./Pages/Today_Appointment";
import Payment_Status from "./Pages/Payment_Status";

import Treatment_Course, { Treatment_Courses } from "./Pages/Treatment_Courses";
import Lab_Patient_List from "./Pages/Lab_Patient_List";
import Lab_Patients_Mark from "./Pages/Lab_Patients_Mark";
import Lab_Report_Upload from "./Pages/Lab_Report_Upload";
import Appointment_Completed from "./Pages/Appointment_Completed";
import { AppointmentBooking } from "./Pages/AppointmentBooking";
import Staff_List from "./Pages/Staff_List";
import { Add_Staff } from "./Pages/Add_Staff";
import { Patient_Registration } from "./Pages/Patient_Registration";
import Mark_Appointment from "./Pages/Mark_Appointment";
import { Lab_Patient_Data } from "./Pages/Lab_Patient_Data";
import { Payment_Update } from "./Pages/Payment_Update";
import { X_Ray_Patient_List } from "./Pages/X_Ray_Patient_List";
import { Today_X_Ray_Test } from "./Pages/Today_X_Ray_Test";
import { Today_Lab_Test } from "./Pages/Today_Lab_Test";
import { Lab_Patients_Form } from "./Pages/Lab_Patients_Form";
import { X_Ray_Patients_Form } from "./Pages/X_Ray_Patients_Form";
import { Patients_Complaint_Mark } from "./Pages/Patients_Complaint_Mark";
import { Patients_Complaint_List } from "./Pages/Patients_Complaint_List";
import { Patients_Complaint_Form } from "./Pages/Patients_Complaint_Form";
import { Mark_Patient_Type } from "./Pages/Mark_Patient_Type";
import { Active_Patients } from "./Pages/Active_Patients";
import { Recovered_Patients } from "./Pages/Recovered_Patients";
import { Lab_Registration_Form } from "./Pages/Lab_Registeration_Form";
import { X_Ray_Registration_Form } from "./Pages/X_Ray_Registration_Form";
import { Bill_Template } from "./Pages/Bill_Template";
import { Doctors_List } from "./Pages/Doctors_List";
import { Doctors_Staff } from "./Pages/Doctors_Staff";
import { Basic_Reports } from "./Pages/Basic_Reports";
import { Get_Report } from "./Pages/Get_Report";
import { Upcoming } from "@mui/icons-material";
import { Upcoming_Appointments } from "./Pages/Upcoming_Appointments";
import { Completed_Appointments } from "./Pages/Completed_Appointments";
import { Confirmed_Appointments } from "./Pages/Confirmed_Appointments";
import { Patient_Flow } from "./Pages/Patient_Flow";
import { Add_Course } from "./Pages/Add_Course";
import { Lab_Bill_Template } from "./Pages/Lab_Bill_Template";
import { ScrollToTop } from "./ScrollToTop";
import { Doctor_Details } from "./Pages/Doctor_Details";
import { Add_Slot } from "./Pages/Add_Slot";
import { Add_Vacations } from "./Pages/Add_Vacations";
import { Patient_Details } from "./Pages/Patient_Details";
import { Risk_Assessment_Form } from "./Pages/Risk_Assessment_Form";
import { Update_Doctor_Details } from "./Pages/Update_Doctor_Details";
import { Appointments_Per_Day } from "./Pages/Appointments_Per_Day";
import { Update_Patient_Details } from "./Pages/Update_Patient_Details";
import FreeSoloCreateOptionDialog from "./Pages/FreeSoloCreateOptionDialog";
import { Condition_Category } from "./Pages/Condition_Category";
import { Sub_Category } from "./Pages/Sub_Category";
import { Treatment_Details } from "./Pages/Treatment_Details";
import { Session_Details } from "./Pages/Session_Details";
import { Update_Course } from "./Pages/Update_Course";
import { Display_Session } from "./Pages/Display_Session";
import { Update_Session } from "./Pages/Update_Session";
import { Add_Session } from "./Pages/Add_Session";
import { Display_Codition_Category } from "./Pages/Display_Codition_Category";
import { Display_Sub_Category } from "./Pages/Display_Sub_Category";
import { Update_Condition_Category } from "./Pages/Update_Condition_Category";
import { Update_Sub_Category } from "./Pages/Update_Sub_Category";
// import CheckboxesTags from "./Pages/a";
import { Change_Doctor_Password } from "./Pages/Change_Doctor_Password";
import { Update_Staff } from "./Pages/Update_Staff";
import { My_Schedule } from "./Pages/My_Schedule";
import { My_Appointments } from "./Pages/My_Appointments";

function App() {
  console.log("date:25/10/2024 09:45 A.M.");
  return (
    <div className="App">
      <BrowserRouter basename="/medicalapp/doctor">
        <ScrollToTop />

        <Routes basename="/medicalapp/doctor">
          <Route path="/" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />

          <Route path="/admin" element={<Protected Component={Main} />}>
            <Route index element={<Dashboard />} />

            <Route path="Booking_List" element={<Booking_List />} />
            <Route path="Patient_List" element={<Patient_List />} />
            <Route
              path="Patient_List/Update_Patient_Details"
              element={<Update_Patient_Details />}
            />

            <Route path="Patient_Flow" element={<Patient_Flow />} />
            {/* <Route path="Search" element={<FreeSoloCreateOptionDialog />} /> */}
            <Route path="Staff_List" element={<Staff_List />} />
            <Route path="Staff_List/Add_Staff" element={<Add_Staff />} />
            <Route path="Staff_List/Update_Staff" element={<Update_Staff />} />
            <Route
              path="Appointments_Per_Day"
              element={<Appointments_Per_Day />}
            />

            <Route path="Doctors_List" element={<Doctors_List />} />
            <Route
              path="Doctors_List/Change_Doctor_Password"
              element={<Change_Doctor_Password />}
            />
            <Route
              path="Display_Condition_Category/Condition_Category"
              element={<Condition_Category />}
            />

            <Route
              path="Display_Condition_Category"
              element={<Display_Codition_Category />}
            />

            <Route
              path="Display_Condition_Category"
              element={<Display_Codition_Category />}
            />

            <Route path="My_Schedule" element={<My_Schedule />} />

            <Route path="My_Appointments" element={<My_Appointments />} />

            <Route
              path="Display_Condition_Category/Update_Condition_Category"
              element={<Update_Condition_Category />}
            />

            <Route
              path="Display_Sub_Category"
              element={<Display_Sub_Category />}
            />
            <Route
              path="Display_Sub_Category/Sub_Category"
              element={<Sub_Category />}
            />

            <Route
              path="Display_Sub_Category/Update_Sub_Category"
              element={<Update_Sub_Category />}
            />
            <Route
              path="Doctors_List/Doctor_Details"
              element={<Doctor_Details />}
            />

            <Route
              path="Doctors_List/Update_Doctor_Details"
              element={<Update_Doctor_Details />}
            />

            <Route
              path="My_Schedule/Update_Doctor_Details"
              element={<Update_Doctor_Details />}
            />

            <Route
              path="Risk_Assessment_Form"
              element={<Risk_Assessment_Form />}
            />

            <Route path="Doctors_List/Add_Slot" element={<Add_Slot />} />
            <Route path="My_Schedule/Add_Slot" element={<Add_Slot />} />
            <Route
              path="Doctors_List/Add_Vacations"
              element={<Add_Vacations />}
            />

            <Route
              path="Doctors_List/Doctors_Staff"
              element={<Doctors_Staff />}
            />

            <Route path="Appointment_List" element={<Appointment_List />} />
            <Route
              path="Appointment_List/Patient_Details"
              element={<Patient_Details />}
            />
            <Route
              path="Patient_List/Patient_Registration"
              element={<Patient_Registration />}
            />
            <Route
              path="Appointment_List/AppointmentBooking"
              element={<AppointmentBooking />}
            />
            <Route path="Today_Appointment" element={<Today_Appointment />} />
            <Route
              path="Confirmed_Appointments"
              element={<Confirmed_Appointments />}
            />

            <Route
              path="Confirmed_Appointments/Patient_Registration"
              element={<Patient_Registration />}
            />

            <Route
              path="Upcoming_Appointments"
              element={<Upcoming_Appointments />}
            />

            <Route
              path="Completed_Appointments"
              element={<Completed_Appointments />}
            />
            <Route
              path="Today_Appointment/Patient_Registration"
              element={<Patient_Registration />}
            />

            <Route path="Payment_Status" element={<Payment_Status />} />
            <Route
              path="Payment_Status/Payment_Update"
              element={<Payment_Update />}
            />

            <Route
              path="Payment_Status/Payment_Update/Bill_Template"
              element={<Bill_Template />}
            />
            <Route
              path="Appointment_Completed"
              element={<Appointment_Completed />}
            />
            <Route path="Mark_Patient_Type" element={<Mark_Patient_Type />} />
            <Route path="Active_Patients" element={<Active_Patients />} />
            <Route path="Recovered_Patients" element={<Recovered_Patients />} />

            <Route path="Treatment_Courses" element={<Treatment_Courses />} />
            <Route
              path="Treatment_Courses/Update_Course"
              element={<Update_Course />}
            />

            <Route
              path="Treatment_Courses/Display_Session"
              element={<Display_Session />}
            />

            <Route
              path="Treatment_Courses/Display_Session/Update_Session"
              element={<Update_Session />}
            />

            <Route
              path="Treatment_Courses/Display_Session/Add_Session"
              element={<Add_Session />}
            />

            <Route
              path="Treatment_Courses/Add_Course"
              element={<Add_Course />}
            />

            <Route
              path="Patients_Complaint_Mark"
              element={<Patients_Complaint_Mark />}
            />

            <Route
              path="Patients_Complaint_Mark/Patients_Complaint_Form"
              element={<Patients_Complaint_Form />}
            />
            <Route
              path="Patients_Complaint_List"
              element={<Patients_Complaint_List />}
            />
            <Route path="Lab_Patients_Mark" element={<Lab_Patients_Mark />} />
            <Route path="Lab_Patients_Form" element={<Lab_Patients_Form />} />
            <Route
              path="Lab_Patients_Form/Lab_Registration_Form/Lab_Bill_Template"
              element={<Lab_Bill_Template />}
            />

            <Route
              path="Lab_Patients_Form/Lab_Registration_Form"
              element={<Lab_Registration_Form />}
            />

            <Route
              path="X_Ray_Patients_Form"
              element={<X_Ray_Patients_Form />}
            />

            <Route path="Lab_Report_Upload" element={<Lab_Report_Upload />} />
            <Route path="Lab_Patient_List" element={<Lab_Patient_List />} />
            <Route path="X_Ray_Patient_List" element={<X_Ray_Patient_List />} />

            <Route
              path="X_Ray_Patients_Form/X_Ray_Registration_Form"
              element={<X_Ray_Registration_Form />}
            />

            <Route path="Today_X_Ray_Test" element={<Today_X_Ray_Test />} />
            <Route path="Today_Lab_Test" element={<Today_Lab_Test />} />
            <Route path="Basic_Reports" element={<Basic_Reports />} />
            <Route path="Basic_Reports/Get_Report" element={<Get_Report />} />

            <Route
              path="Lab_Patients_Mark/Lab_Patient_Data"
              element={<Lab_Patient_Data />}
            />

            <Route path="Contact_List" element={<Contact_List />} />

            <Route path="Footer_Details" element={<Footer_Details />} />

            <Route path="Mark_Appointment" element={<Mark_Appointment />} />

            <Route path="MyProfile" element={<MyProfile />} />
            <Route
              path="Treatment_Courses/Treatment_Details"
              element={<Treatment_Details />}
            />

            <Route
              path="Treatment_Courses/Treatment_Details/Session_Details"
              element={<Session_Details />}
            />
            <Route path="Change_Password" element={<Change_Password />} />
            <Route
              path="My_Schedule/Change_Doctor_Password"
              element={<Change_Password />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
