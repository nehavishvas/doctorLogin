import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { medicalUrl } from "./BaseUrl/BaseUrl";
import Dashboard from "./Pages/Dashboard";
import { useFetcher } from "react-router-dom";
import MyProfile from "./Page/SuperAdminLogin/MyProfile";

const initialstate = {
  noStaff: 0,
  noDoctors: 0,
  noAppointment: 0,
  noPatient: 0,
  noTodayAppointment: 0,
  noPendingPaymentStatus: 0,
  noActivePatient: 0,
  noRecoveredPatient: 0,
  noTreatmentCourse: 0,
  noPatientComplaint: 0,
  noLabPatient: 0,
  noXrayPatient: 0,
  noTodayLabTest: 0,
  noTodayXrayTest: 0,

  Id: "",
  MyProfile: {},
  appointmentdata: {},
  dashboard: {},
  SelectedSidebar: "",

  stafflist: [],
  doctorlist: [],
  doctoravailability: [],
  slotslist: [],
  vacationslist: [],
  allrole: [],
  updatestaff: false,

  passupdateid: "",
  passdatafromstafflist: {},
  billdata: {},
  getreport: {},

  appointmentno: "",
  doctorfees: "",
  patientlist: [],
  allTreatmentData: [],
  SessionData: [],
  confirmedpatientlist: [],
  condition_category: [],
  sub_category: [],
  treatmentcourseid: "",
  numberofsessions: "",
  patientid: "",
  doctorid: "",
  appointmentlist: [],
  appointmentsperday: "",
  todayappointment: [],
  labpatientlist: [],
  complaintlist: [],
  markcomplaintlist: [],
  marklabxraypatient: [],
  markpatienttype: [],
  paymentform: {},

  complaintform: {},
  labformpassdata: {},
  xrayformpassdata: {},
  xraynamelist: [],
  patientidforbill: "",
  billdata: "",
  patientrecord: [],
  paymentmode: "",
  treatmentcourses: [],
  totalappointment: "",

  patientidforlabbill: "",
  patientidforxraybill: "",

  labbilldata: {},
  xraybilldata: {},

  labformdata: {},

  labreportupload: "",
  xrayreportupload: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOTALAPPOINTMENT":
      return { ...state, totalappointment: action.payload };

    case "SESSIONDATA":
      return { ...state, SessionData: action.payload };

    case "NUMBEROFSESSION":
      return { ...state, numberofsessions: action.payload };
    case "TREATMENTCOURSEID":
      return { ...state, treatmentcourseid: action.payload };
    case "ALLTREATMENTDATA":
      return { ...state, allTreatmentData: action.payload };

    case "CONDITION_CATEGORY":
      return { ...state, condition_category: action.payload };

    case "SUB_CATEGORY":
      return { ...state, sub_category: action.payload };

    case "APPOINTMENTSPERDAY":
      return { ...state, appointmentsperday: action.payload };

    case "DOCTORAVAILABILITY":
      return { ...state, doctoravailability: action.payload };
    case "SLOTSLIST":
      return { ...state, slotslist: action.payload };
    case "VACATIONSLIST":
      return { ...state, vacationslist: action.payload };
    case "TREATMENTCOURSES":
      return { ...state, treatmentcourses: action.payload };

    case "LABREPORTUPLOAD":
      return { ...state, labreportupload: action.payload };

    case "XRAYREPORTUPLOAD":
      return { ...state, xrayreportupload: action.payload };

    case "LABFORMDATA":
      return { ...state, labformdata: action.payload };

    case "PATIENTIDFORLABBILL":
      return { ...state, patientidforlabbill: action.payload };

    case "LABBILLDATA":
      return { ...state, labbilldata: action.payload };

    case "PATIENTIDFORXRAY":
      return { ...state, patientidforxraybill: action.payload };

    case "XRAYBILLDATA":
      return { ...state, xraybilldata: action.payload };
    case "PAYMENTMODE":
      return { ...state, paymentmode: action.payload };
    case "PATIENTRECORD":
      return { ...state, patientrecord: action.payload };
    case "GETREPORT":
      return { ...state, getreport: action.payload };

    case "BILLDATA":
      return { ...state, billdata: action.payload };
    case "PATIENTIDFORBILL":
      return { ...state, patientidforbill: action.payload };

    case "XRAYNAMELIST":
      return { ...state, xraynamelist: action.payload };
    case "MARKLABXRAYPATIENT":
      return { ...state, marklabxraypatient: action.payload };

    case "LABFORMPASSDATA":
      return { ...state, labformpassdata: action.payload };

    case "XRAYFORMPASSDATA":
      return { ...state, xrayformpassdata: action.payload };

    case "MARKPATIENTTYPE":
      return { ...state, markpatienttype: action.payload };

    case "MARKCOMPLAINTLIST":
      return { ...state, markcomplaintlist: action.payload };

    case "DASHBOARD":
      return { ...state, dashboard: { ...state.dashboard, ...action.payload } };

    case "PAYMENTFORM":
      return { ...state, paymentform: action.payload };

    case "APPOINTMENTDATA":
      return { ...state, appointmentdata: action.payload };
    case "CONFIRMEDPATIENTLIST":
      return { ...state, confirmedpatientlist: action.payload };

    case "APPOINTMENTNO":
      return { ...state, appointmentno: action.payload };

    case "COMPLAINTFORM":
      return { ...state, complaintform: action.payload };

    case "TODAYAPPOINTMENT":
      return { ...state, todayappointment: action.payload };

    case "DOCTORLIST":
      return { ...state, doctorlist: action.payload };

    case "ID":
      return { ...state, Id: action.payload };

    case "MYPROFILE":
      return { ...state, MyProfile: action.payload };

    case "SELECTEDSIDEBAR":
      return { ...state, SelectedSidebar: action.payload };

    case "ALLSTAFF":
      return { ...state, stafflist: action.payload };

    case "UPDATESTAFF":
      return { ...state, updatestaff: action.payload };

    case "PASSUPDATEID":
      return { ...state, passupdateid: action.payload };

    case "PASSDATAFROMSTAFFLIST":
      return { ...state, passdatafromstafflist: action.payload };

    case "ALLROLE":
      return { ...state, allrole: action.payload };

    case "PATIENTLIST":
      return { ...state, patientlist: action.payload };

    case "LABPATIENTLIST":
      return { ...state, labpatientlist: action.payload };

    case "COMPLAINTLIST":
      return { ...state, complaintlist: action.payload };

    case "APPOINTMENTLIST":
      return { ...state, appointmentlist: action.payload };

    case "PATIENTID":
      return { ...state, patientid: action.payload };

    case "DOCTORFEES":
      return { ...state, doctorfees: action.payload };

    default:
      return state;
  }
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  const SESSIONDATA = (data) => {
    return dispatch({
      type: "SESSIONDATA",
      payload: data,
    });
  };

  const TREATMENTCOURSEID = (data) => {
    return dispatch({
      type: "TREATMENTCOURSEID",
      payload: data,
    });
  };

  const NUMBEROFSESSION = (data) => {
    return dispatch({
      type: "NUMBEROFSESSION",
      payload: data,
    });
  };

  const TOTALAPPOINTMENT = (data) => {
    return dispatch({
      type: "TOTALAPPOINTMENT",
      payload: data,
    });
  };

  const ALLTREATMENTDATA = (data) => {
    return dispatch({
      type: "ALLTREATMENTDATA",
      payload: data,
    });
  };

  const DOCTORAVAILABILITY = (data) => {
    return dispatch({
      type: "DOCTORAVAILABILITY",
      payload: data,
    });
  };

  const CONDITION_CATEGORY = (data) => {
    return dispatch({
      type: "CONDITION_CATEGORY",
      payload: data,
    });
  };

  const SUB_CATEGORY = (data) => {
    return dispatch({
      type: "SUB_CATEGORY",
      payload: data,
    });
  };

  const APPOINTMENTSPERDAY = (data) => {
    return dispatch({
      type: "APPOINTMENTSPERDAY",
      payload: data,
    });
  };

  const SLOTSLIST = (data) => {
    return dispatch({
      type: "SLOTSLIST",
      payload: data,
    });
  };

  const VACATIONSLIST = (data) => {
    return dispatch({
      type: "VACATIONSLIST",
      payload: data,
    });
  };
  const DASHBOARD = (data) => {
    return dispatch({
      type: "DASHBOARD",
      payload: data,
    });
  };

  const LABREPORTUPLOAD = (data) => {
    return dispatch({
      type: "LABREPORTUPLOAD",
      payload: data,
    });
  };

  const XRAYREPORTUPLOAD = (data) => {
    return dispatch({
      type: "XRAYREPORTUPLOAD",
      payload: data,
    });
  };

  const LABFORMDATA = (data) => {
    return dispatch({
      type: "LABFORMDATA",
      payload: data,
    });
  };

  const PATIENTIDFORLABBILL = (data) => {
    return dispatch({
      type: "PATIENTIDFORLABBILL",
      payload: data,
    });
  };

  const LABBILLDATA = (data) => {
    return dispatch({
      type: "LABBILLDATA",
      payload: data,
    });
  };

  const PATIENTIDFORXRAYBILL = (data) => {
    return dispatch({
      type: "PATIENTIDFORXRAYBILL",
      payload: data,
    });
  };

  const XRAYBILLDATA = (data) => {
    return dispatch({
      type: "XRAYBILLDATA",
      payload: data,
    });
  };

  const TREATMENTCOURSES = (data) => {
    return dispatch({
      type: "TREATMENTCOURSES",
      payload: data,
    });
  };

  const PAYMENTMODE = (data) => {
    return dispatch({
      type: "PAYMENTMODE",
      payload: data,
    });
  };

  const PATIENTRECORD = (data) => {
    return dispatch({
      type: "PATIENTRECORD",
      payload: data,
    });
  };

  const GETREPORT = (data) => {
    return dispatch({
      type: "GETREPORT",
      payload: data,
    });
  };

  const BILLDATA = (data) => {
    return dispatch({
      type: "BILLDATA",
      payload: data,
    });
  };

  const PATIENTIDFORBILL = (data) => {
    return dispatch({
      type: "PATIENTIDFORBILL",
      payload: data,
    });
  };

  const XRAYNAMELIST = (data) => {
    return dispatch({
      type: "XRAYNAMELIST",
      payload: data,
    });
  };

  const LABFORMPASSDATA = (data) => {
    return dispatch({
      type: "LABFORMPASSDATA",
      payload: data,
    });
  };

  const XRAYFORMPASSDATA = (data) => {
    return dispatch({
      type: "XRAYFORMPASSDATA",
      payload: data,
    });
  };

  const MARKLABXRAYPATIENT = (data) => {
    return dispatch({
      type: "MARKLABXRAYPATIENT",
      payload: data,
    });
  };

  const MARKPATIENTTYPE = (data) => {
    return dispatch({
      type: "MARKPATIENTTYPE",
      payload: data,
    });
  };

  const MARKCOMPLAINTLIST = (data) => {
    return dispatch({
      type: "MARKCOMPLAINTLIST",
      payload: data,
    });
  };

  const updateDashboard = (newData) => {
    let newDashboard = { ...state.dashboard, ...newData };

    DASHBOARD(newDashboard);
  };

  const TODAYAPPOINTMENT = (data) => {
    return dispatch({
      type: "TODAYAPPOINTMENT",
      payload: data,
    });
  };

  const PAYMENTFORM = (data) => {
    return dispatch({
      type: "PAYMENTFORM",
      payload: data,
    });
  };
  const COMPLAINTFORM = (data) => {
    return dispatch({
      type: "COMPLAINTFORM",
      payload: data,
    });
  };
  const APPOINTMENTDATA = (data) => {
    return dispatch({
      type: "APPOINTMENTDATA",
      payload: data,
    });
  };

  const CONFIRMEDPATIENTLIST = (data) => {
    return dispatch({
      type: "CONFIRMEDPATIENTLIST",
      payload: data,
    });
  };

  const DOCTORLIST = (data) => {
    return dispatch({
      type: "DOCTORLIST",
      payload: data,
    });
  };

  const APPOINTMENTNO = (data) => {
    return dispatch({
      type: "APPOINTMENTNO",
      payload: data,
    });
  };

  const DOCTORFEES = (data) => {
    return dispatch({
      type: "DOCTORFEES",
      payload: data,
    });
  };
  const PATIENTID = (data) => {
    return dispatch({
      type: "PATIENTID",
      payload: data,
    });
  };

  const UPDATESTAFF = (data) => {
    return dispatch({
      type: "UPDATESTAFF",
      payload: data,
    });
  };

  const ALLROLE = (data) => {
    return dispatch({
      type: "ALLROLE",
      payload: data,
    });
  };

  const ID = (data) => {
    return dispatch({
      type: "ID",
      payload: data,
    });
  };

  const MYPROFILE = (data) => {
    return dispatch({
      type: "MYPROFILE",
      payload: data,
    });
  };

  const SELECTEDSIDEBAR = (data) => {
    return dispatch({
      type: "SELECTEDSIDEBAR",
      payload: data,
    });
  };

  const ALLSTAFF = (data) => {
    return dispatch({
      type: "ALLSTAFF",
      payload: data,
    });
  };

  const PATIENTLIST = (data) => {
    return dispatch({
      type: "PATIENTLIST",
      payload: data,
    });
  };

  const LABPATIENTLIST = (data) => {
    return dispatch({
      type: "LABPATIENTLIST",
      payload: data,
    });
  };

  const COMPLAINTLIST = (data) => {
    return dispatch({
      type: "COMPLAINTLIST",
      payload: data,
    });
  };

  const APPOINTMENTLIST = (data) => {
    return dispatch({
      type: "APPOINTMENTLIST",
      payload: data,
    });
  };

  const PASSUPDATEID = (data) => {
    return dispatch({
      type: "PASSUPDATEID",
      payload: data,
    });
  };

  const PASSDATAFROMSTAFFLIST = (data) => {
    return dispatch({
      type: "PASSDATAFROMSTAFFLIST",
      payload: data,
    });
  };

  const getstaffdata = () => {
    axios
      .get(`${medicalUrl}getAllUserStaffData`)
      .then((resp) => {
        ALLSTAFF(resp.data.data);
        let newDashboard = {
          ...state.dashboard,
          noStaff: resp.data.data.length,
        };
        DASHBOARD(newDashboard);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getdoctordata = () => {
    axios
      .get(`${medicalUrl}getAllDoctorList`)
      .then((resp) => {
        let list = resp.data.doctorList;
        console.log("new doctor list", list);
        DOCTORLIST(list);
        let newDashboard = { ...state.dashboard, noDoctors: list.length };
        Dashboard(newDashboard);
      })
      .catch((error) => console.log(error));
  };

  // const getdoctordata = () => {
  //   axios
  //     .get(`${medicalUrl}getAllDoctorList`)
  //     .then((resp) => {
  //       let list = resp.data.doctorList;
  //       DOCTORLIST(list);
  //       updateDashboard({ noDoctors: list.length });
  //     })
  //     .catch((error) => console.log(error));
  // };

  /*----------------------------*/

  useEffect(() => {
    if (state.Id) {
      getconditioncategoryapi();
      getsubcategoryapi();
      getappointmentsperdayapi();
      getappointmentapi();

      getalltreatmentdata();

      getpatientrecordapi();
      gettreatmentcourseapi();
    }
  }, [state.Id]);

  const getconditioncategoryapi = () => {
    axios
      .get(`${medicalUrl}getCategories`)
      .then((resp) => {
        let data = resp.data.categories;
        console.log(data, "this is category api");
        CONDITION_CATEGORY(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getsubcategoryapi = () => {
    axios
      .get(`${medicalUrl}getSubCategories`)
      .then((resp) => {
        let data = resp.data.subCategories;
        SUB_CATEGORY(data);
        console.log("sub categories by api", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (state.passupdateid) {
      let obj = state.stafflist.find((e) => e._id == state.passupdateid);

      if (obj) {
        PASSDATAFROMSTAFFLIST(obj);
        PASSUPDATEID("");
      }
    }
  }, [state.passupdateid]);

  useEffect(() => {
    let data = localStorage.getItem("getreport");
    if (data) {
      let obj = JSON.parse(data);
      GETREPORT(obj);
    }
  }, []);
  useEffect(() => {
    let patientid = localStorage.getItem("patientid");
    if (patientid) {
      let id = JSON.parse(patientid);
      PATIENTID(id);
    }
  }, [state.Id]);

  useEffect(() => {
    let no = localStorage.getItem("appointmentno");
    if (no) {
      let appno = JSON.parse(no);

      APPOINTMENTNO(appno);
    }
  }, [state.Id]);

  useEffect(() => {
    let data = localStorage.getItem("appointmentdata");

    if (data) {
      APPOINTMENTDATA(JSON.parse(data));
    }
  }, [state.Id]);

  const todayappointmentrefresh = () => {
    axios
      .get(`${medicalUrl}TodayAppointment`)
      .then((resp) => {
        let confirmlist = resp.data.data.filter(
          (e) => e.appointment_status === "confirmed"
        );

        TODAYAPPOINTMENT(confirmlist);

        updateDashboard({ noTodayAppointment: confirmlist.length });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      state.updatestaff &&
      location.pathname !== "/admin/Staff_List/Add_Staff"
    ) {
      UPDATESTAFF(false);
    }
  }, [location.pathname, state.updatestaff, UPDATESTAFF]);

  useEffect(() => {
    if (state.Id) {
      getstaffdata();
    }
    // axios
    //   .get(`${medicalUrl}getAllUserStaffData`)
    //   .then((resp) => {
    //     ALLSTAFF(resp.data.data);

    //     updateDashboard({ noStaff: resp.data.data.length });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [state.Id]);

  const getappointmentsperdayapi = () => {
    axios
      .get(`${medicalUrl}getAppointmentPerDay`)
      .then((resp) => {
        let data = resp.data[0];

        APPOINTMENTSPERDAY(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getpatientapi = () => {
    axios
      .get(`${medicalUrl}getAllPatientList`)
      .then((resp) => {
        PATIENTLIST(resp.data.patientList);

        let pendingpaymentlist = resp.data.patientList.filter(
          (e) => e.payment_done === "yes"
        );

        let lab = resp.data.patientList.filter(
          (e) => e.diagnosticStatus.laboratory == "yes"
        );

        let xray = resp.data.patientList.filter(
          (e) => e.diagnosticStatus.x_ray == "yes"
        );
        updateDashboard({
          noPatient: resp.data.patientList.length,

          noPendingPaymentStatus: pendingpaymentlist.length,
          noPatientComplaint: complaint.length,
          noLabPatient: lab.length,
          noXrayPatient: xray.length,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let obj = localStorage.getItem("passdatacomplaintform");
    if (obj) {
      let data = JSON.parse(obj);
      COMPLAINTFORM(data);
    }
  }, [state.Id]);

  const getpatientrecordapi = () => {
    axios
      .get(`${medicalUrl}getAllPatientRecord`)
      .then((resp) => {
        console.log(resp.data.patientRecord);
        let data = resp.data.patientRecord;
        PATIENTRECORD(data);
      })
      .catch((error) => console.log(error));
  };

  const passdatatocomplaintform = (no, date) => {
    let data = state.patientlist.find((e) => e.appointmentNo == no.toString());

    if (data) {
      axios
        .get(`${medicalUrl}getAllDoctorList`)
        .then((resp) => {
          let list = resp.data.doctorList;

          let doctorobj = list.find((e) => e.name == data.doctorName);

          if (doctorobj) {
            let obj = {
              no: no,
              date: date,
              patientid: data._id,
              doctorid: doctorobj._id,
            };

            localStorage.setItem("passdatacomplaintform", JSON.stringify(obj));

            COMPLAINTFORM(obj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getappointmentapi = () => {
    axios
      .get(`${medicalUrl}getAllAppointmentList`)
      .then((resp) => {
        APPOINTMENTLIST(resp.data.data);

        let data = resp.data.data.filter((e) => e.doctorId == state.Id);
        console.log(data, "this is dashboard data of appointment list");

        // updateDashboard({ noAppointment: data.length });
        DASHBOARD({ ...state.dashboard, noAppointment: data.length });
        TOTALAPPOINTMENT(data.length);

        let list = resp.data.data;

        let filterlist = list.filter(
          (e) => e.appointment_status == "confirmed"
        );
        CONFIRMEDPATIENTLIST(filterlist);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paymentformdata = (id, appointmentno, fees) => {
    let obj = { id: id, appointmentno: appointmentno, fees: fees };
    PAYMENTFORM(obj);
  };

  useEffect(() => {
    if (state.paymentformdata) {
      console.log(state.paymentformdata);
    }
  }, [state.paymentformdata]);

  useEffect(() => {
    if (state.patientidforbill) {
      axios
        .get(`${medicalUrl}/getPatientById/${state.patientidforbill}`)
        .then((resp) => {
          let obj = resp.data.patientData;
          console.log("data is coming from generate bill", resp);
          let finddata = state.appointmentlist?.find(
            (e) => e.appointment_no == obj.appointmentNo
          );

          let newobj = {
            ...obj,
            diseaseName: finddata ? finddata.disease_name : "-",
          };

          console.log("bill id se data aaya h", newobj);
          localStorage.setItem("billdetails", JSON.stringify(newobj));
          BILLDATA(newobj);
        });
    }
  }, [state.patientidforbill]);

  useEffect(() => {
    let data = localStorage.getItem("billdetails");
    if (data) {
      let obj = JSON.parse(data);
      BILLDATA(obj);
    }
  }, [state.Id]);

  useEffect(() => {
    if (state.patientidforlabbill) {
      axios
        .get(`${medicalUrl}/getPatientById/${state.patientidforlabbill}`)
        .then((resp) => {
          let obj = resp.data.message;

          console.log("labbill id se data aaya h", obj);
          localStorage.setItem("labbilldetails", JSON.stringify(obj));
          LABBILLDATA(obj);
        });
    }
  }, [state.patientidforlabbill]);

  useEffect(() => {
    let data = localStorage.getItem("labbilldetails");
    if (data) {
      let obj = JSON.parse(data);
      LABBILLDATA(obj);
    }
  }, [state.Id]);

  useEffect(() => {
    if (state.patientidforxraybill) {
      axios
        .get(`${medicalUrl}/getPatientById/${state.patientidforxraybill}`)
        .then((resp) => {
          let obj = resp.data.message;

          console.log("xraybill id se data aaya h", obj);
          localStorage.setItem("xraybilldetails", JSON.stringify(obj));
          XRAYBILLDATA(obj);
        });
    }
  }, [state.patientidforxraybill]);

  useEffect(() => {
    let data = localStorage.getItem("xraybilldetails");
    if (data) {
      let obj = JSON.parse(data);
      XRAYBILLDATA(obj);
    }
  }, [state.Id]);

  useEffect(() => {
    let obj = localStorage.getItem("paymentformdata");
    if (obj) {
      let data = JSON.parse(obj);

      PAYMENTFORM(data);
    }
  }, [state.Id]);

  const gettodayappointmentapi = () => {
    axios
      .get(`${medicalUrl}TodayAppointment`)
      .then((resp) => {
        let confirmlist = resp.data.data.filter(
          (e) => e.appointment_status == "confirmed"
        );

        TODAYAPPOINTMENT(confirmlist);

        updateDashboard({ noTodayAppointment: confirmlist.length });
      })
      .catch((error) => {
        console.log("today appointment not getting");
      });
  };

  useEffect(() => {
    gettodayappointmentapi();
  }, [state.patientList]);

  useEffect(() => {
    if (state.Id) {
      todayappointmentrefresh();

    }
    axios
      .get(`${medicalUrl}getAllRoles`)
      .then((resp) => {
        let roles = resp.data.role;
        ALLROLE(roles);
      })
      .catch((error) => {
        console.log("roles not coming");
      });

    axios
      .get(`${medicalUrl}getAllPatientList`)
      .then((resp) => {
        PATIENTLIST(resp.data.patientList);

        let pendingpaymentlist = resp.data.patientList.filter(
          (e) => e.payment_done === "yes"
        );

        let complaint = resp.data.patientList.filter(
          (e) => e.complaint.length > 0
        );

        let lab = resp.data.patientList.filter(
          (e) => e.diagnosticStatus.laboratory == "yes"
        );

        let xray = resp.data.patientList.filter(
          (e) => e.diagnosticStatus.x_ray == "yes"
        );
        updateDashboard({
          noPatient: resp.data.patientList.length,

          noPendingPaymentStatus: pendingpaymentlist.length,
          noPatientComplaint: complaint.length,
          noLabPatient: lab.length,
          noXrayPatient: xray.length,
        });
      })
      .catch((error) => {
        console.log("updated allappointmentlist not getting");
      });

    // axios
    //   .get(`${medicalUrl}TodayAppointment`)
    //   .then((resp) => {
    //     let confirmlist = resp.data.data.filter(
    //       (e) => e.appointment_status === "confirmed"
    //     );

    //     TODAYAPPOINTMENT(confirmlist);

    //     updateDashboard({ noTodayAppointment: confirmlist.length });
    //   })
    //   .catch((error) => {
    //     console.log("today appointment not getting");
    //   });

    // axios.get(`${medicalUrl}getAllComplaintData`).then((resp) => {
    //   let list = resp.data.data;

    //   let patientidincomplaintlist = list.map((e) => e.patientId);

    //   console.log("complaint id", patientidincomplaintlist);
    //   console.log("patient list", state.patientlist);

    //   let complaintlist = state.patientlist.filter((e) =>
    //     patientidincomplaintlist.includes(e._id)
    //   );
    //   console.log(complaintlist);

    //   COMPLAINTLIST(complaintlist);
    //   updateDashboard({ noPatientComplaint: list.length });
    // });
  }, [state.Id]);

  // useEffect(() => {
  //   if (state.Id) {
  //     axios
  //       .get(`${medicalUrl}getAllAppointmentList`)
  //       .then((resp) => {
  //         APPOINTMENTLIST(resp.data.data);
  //         let data = resp.data.data.filter((e) => e.doctorId == state.Id);
  //         console.log("this is filtered appointment data", data);

  //         // updateDashboard({ noAppointment: data.length });
  //         DASHBOARD({ ...state.dashboard, noAppointment: data.length });

  //         let list = resp.data.data;

  //         let filterlist = list.filter(
  //           (e) => e.appointment_status == "confirmed"
  //         );
  //         CONFIRMEDPATIENTLIST(filterlist);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [state.Id]);

  // useEffect(() => {
  //   if (state.patientlist) {
  //     let data = state.patientlist.filter((e) => e.complaint.length > 0);

  //     COMPLAINTLIST(data);
  //     // let complaintlistlength = data.length;
  //     // updateDashboard({ noPatientComplaint: complaintlistlength });
  //   }
  // }, [state.patientlist]);

  useEffect(() => {
    if (state.patientlist) {
      let lab = state.patientlist.filter((e) => e.labReportUploaded == "yes");
      let xray = state.patientlist.filter((e) => e.xrayReportUploaded == "yes");

      // updateDashboard({ noLabPatient: lab.length });
      LABREPORTUPLOAD(lab.length);
      XRAYREPORTUPLOAD(xray.length);
    }
  }, [state.patientlist]);

  // useEffect(() => {
  //   if (state.patientlist) {
  //     axios.get(`${medicalUrl}getAllComplaintData`).then((resp) => {
  //       let list = resp.data.data;
  //       console.log("complaint list length", list);

  //       let patientidincomplaintlist = list.map((e) => e.patientId);

  //       console.log("complaint id", patientidincomplaintlist);
  //       console.log("patient list", state.patientlist);

  //       let complaintlist = state.patientlist.filter((e) =>
  //         patientidincomplaintlist.includes(e._id)
  //       );
  //       console.log(complaintlist);

  //       let markcomplaintlist = state.patientlist.map((e) => {
  //         const data = list.find((b) => b.patientId == e._id);

  //         return {
  //           ...e,
  //           patientcomplaintstatus: data
  //             ? data.diagnosticStatus.complaintStatus
  //             : "no",
  //           complaint: data ? data.complaint : "",
  //         };
  //       });

  //       let marklabxraypatient = state.patientlist.map((e) => {
  //         const data = list.find((b) => b.patientId == e._id);
  //         return {
  //           ...e,
  //           laboratory: data ? data.diagnosticStatus.laboratory : "no",
  //           x_ray: data ? data.diagnosticStatus.x_ray : "no",
  //           labform: "no",
  //           xrayform: "no",
  //         };
  //       });

  //       let markpatienttype = state.patientlist;

  //       let updatedcomplaintlist = state.patientlist.map((e) => {
  //         return {
  //           ...e,
  //           complaint: data ? data.complaint : "",
  //           complaintStatus: data
  //             ? data.diagnosticStatus.complaintStatus
  //             : "no",
  //         };
  //       });
  //       COMPLAINTLIST(updatedcomplaintlist);
  //       MARKCOMPLAINTLIST(markcomplaintlist);
  //       MARKLABXRAYPATIENT(marklabxraypatient);
  //       MARKPATIENTTYPE(markpatienttype);
  //       console.log(updatedcomplaintlist);

  //       console.log("context.js line no 684 markpatienttype", markpatienttype);
  //       updateDashboard({ noPatientComplaint: list.length });
  //     });
  //   }
  // }, [state.patientlist]);

  const refreshcomplaintlist = () => {
    console.log("refresh start");

    axios.get(`${medicalUrl}getAllComplaintData`).then((resp) => {
      let list = resp.data.data;

      let patientidincomplaintlist = list.map((e) => e.patientId);

      console.log("complaint id", patientidincomplaintlist);
      console.log("patient list", state.patientlist);

      let complaintlist = state.patientlist.filter((e) =>
        patientidincomplaintlist.includes(e._id)
      );
      console.log(complaintlist);

      let markcomplaintlist = state.patientlist.map((e) => {
        const data = list.find((b) => b.patientId == e._id);

        return {
          ...e,
          patientcomplaintstatus: data
            ? data.diagnosticStatus.complaintStatus
            : "no",
          complaint: data ? data.complaint : "",
        };
      });

      let marklabxraypatient = state.patientlist.map((e) => {
        const data = list.find((b) => b.patientId == e._id);
        return {
          ...e,
          laboratory: data ? data.diagnosticStatus.laboratory : "no",
          x_ray: data ? data.diagnosticStatus.x_ray : "no",
        };
      });

      let markpatienttype = state.patientlist.map((e) => {
        const data = list.find((b) => b.patientId == e._id);
        return {
          ...e,
          patientFlow: data ? data.diagnosticStatus.patientFlow : "no",
        };
      });

      let updatedcomplaintlist = state.patientlist.map((e) => {
        const data = list.find((b) => b.patientId == e._id);

        return {
          ...e,
          complaint: data ? data.complaint : "",
          complaintStatus: data ? data.diagnosticStatus.complaintStatus : "no",
        };
      });
      COMPLAINTLIST(updatedcomplaintlist);
      MARKCOMPLAINTLIST(markcomplaintlist);
      MARKLABXRAYPATIENT(marklabxraypatient);
      MARKPATIENTTYPE(markpatienttype);
      console.log(updatedcomplaintlist);

      console.log("context.js line no 684 markpatienttype", markpatienttype);
      updateDashboard({ noPatientComplaint: list.length });
    });
  };

  // useEffect(() => {
  //   axios.get(`${medicalUrl}getDiagnosticField`).then((resp) => {
  //     console.log("xray names", resp.data.diagnosticField.xRay);
  //     let data = resp.data.diagnosticField.xRay;

  //     const xraylist = Object.keys(data[0]);
  //     XRAYNAMELIST(xraylist);
  //     console.log("xraylsit in array", xraylist);
  //   });
  // }, []);

  useEffect(() => {
    let data = localStorage.getItem("labformpassdata");
    if (data) {
      let obj = JSON.parse(data);
      LABFORMPASSDATA(obj);
    }
  }, [state.Id]);

  useEffect(() => {
    let data = localStorage.getItem("xrayformpassdata");
    if (data) {
      let obj = JSON.parse(data);
      XRAYFORMPASSDATA(obj);
    }
  }, [state.Id]);

  useEffect(() => {
    if (state.Id) {
      axios
        .get(`${medicalUrl}getAllDoctorList`)
        .then((resp) => {
          let list = resp.data.doctorList;

          let data = list.find((e) => e._id == state.Id);
          MYPROFILE(data);

          DOCTORLIST(list);

          updateDashboard({ noDoctors: list.length });
        })
        .catch((error) => console.log(error));
    }
  }, [state.Id]);

  useEffect(() => {
    axios
      .get(`${medicalUrl}getAllDoctorAvailability`)
      .then((resp) => {
        let list = resp.data.doctorAvailability;
        DOCTORAVAILABILITY(list);
        // updateDashboard({ noDoctors: list.length });
      })
      .catch((error) => console.log(error));
  }, [state.Id]);

  const getalldoctoravailability = () => {
    axios
      .get(`${medicalUrl}getAllDoctorAvailability`)
      .then((resp) => {
        let list = resp.data.doctorAvailability;
        DOCTORAVAILABILITY(list);
        updateDashboard({ noDoctors: list.length });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (state.Id) {
      getallvacationlist();
    }
    // axios
    //   .get(`${medicalUrl}getAllVacation`)
    //   .then((resp) => {
    //     let list = resp.data.data;
    //     VACATIONSLIST(list);
    //   })
    //   .catch((error) => console.log(error));
  }, [state.Id]);

  const getallvacationlist = () => {
    axios
      .get(`${medicalUrl}getAllVacation`)
      .then((resp) => {
        let list = resp.data.data;
        VACATIONSLIST(list);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (state.Id) {
      getallslotsdata();
    }

    // axios
    //   .get(`${medicalUrl}getAllSlot`)
    //   .then((resp) => {
    //     let list = resp.data.slotsData;
    //     SLOTSLIST(list);
    //   })
    //   .catch((error) => console.log(error));
  }, [state.Id]);

  const getallslotsdata = () => {
    axios
      .get(`${medicalUrl}getAllSlot`)
      .then((resp) => {
        let list = resp.data.slotsData;
        SLOTSLIST(list);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let appointmentno = localStorage.getItem("appointmentno");
    let doctorfees = localStorage.getItem("doctorfees");

    if (appointmentno) {
      let obj = JSON.parse(appointmentno);
      APPOINTMENTNO(obj);
    }

    if (doctorfees) {
      let fees = JSON.parse(doctorfees);
      DOCTORFEES(fees);
    }
  }, []);
  // useEffect(() => {
  //   if (state.Id) {
  //     console.log("id is ", state.Id);
  //     axios
  //       .get(`${medicalUrl}getAdminDetail/${state.Id}`)

  //       .then((resp) => {
  //         MYPROFILE(resp.data.data);
  //         localStorage.setItem("myprofiledata", JSON.stringify(resp.data.data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [state.Id]);

  useEffect(() => {
    let data = localStorage.getItem("id");
    if (data) {
      ID(data);
      state.Id = data;
    }
  }, []);

  // useEffect(() => {
  //   axios.get(`${medicalUrl}getTreatmentDetail`).then((resp) => {
  //     let courses = resp.data.data;
  //     console.log("courses", courses);

  //     TREATMENTCOURSES(courses);
  //   });
  // }, [state.Id]);

  useEffect(() => {
    if (state.labformpassdata.length > 0 && state.patientlist) {
      console.log(state.labformpassdata);
      console.log(state.patientlist);

      let patientid = state.labformpassdata[0].patientid;
      let obj = state.patientlist.find((e) => e._id == patientid);

      let newobj = obj ? { ...obj, labtestdata: state.labformpassdata } : null;

      LABBILLDATA(newobj);

      console.log(newobj);
    }
  }, [state.labformpassdata, state.patientlist]);

  const gettreatmentcourseapi = () => {
    axios.get(`${medicalUrl}getTreatmentDetail`).then((resp) => {
      let courses = resp.data.data;
      console.log("courses", courses);
      TREATMENTCOURSES(courses);
    });
  };

  const getalltreatmentdata = () => {
    axios
      .get(`${medicalUrl}getAllTreatmentCourse`)
      .then((resp) => {
        let data = resp.data.allTreatmentData;

        let newdata = data.filter((e) => e.doctorId == state.Id);

        ALLTREATMENTDATA(newdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (state.Id) {
      getallsessiondata();
    }
    // axios
    //   .get(`${medicalUrl}getAllTreatmentDetail`)
    //   .then((resp) => {
    //     let data = resp.data.allTreatmentData;
    //     SESSIONDATA(data);
    //   })
    //   .catch((error) => console.log(error));
  }, [state.Id]);

  const getallsessiondata = () => {
    axios.get(`${medicalUrl}getAllTreatmentDetail`).then((resp) => {
      let data = resp.data.allTreatmentData;
      SESSIONDATA(data);
    });
  };

  useEffect(() => {
    let id = localStorage.getItem("treatmentcourseid");
    TREATMENTCOURSEID(id);
  }, [state.Id]);

  useEffect(() => {
    let noofsession = localStorage.getItem(JSON.stringify("noofsessions"));
    if (noofsession) {
      let session = JSON.parse(noofsession);

      NUMBEROFSESSION(session);
    }
  }, [state.Id]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        DASHBOARD,
        SLOTSLIST,
        gettodayappointmentapi,
        // getcomplaintpatientapi,
        COMPLAINTLIST,
        APPOINTMENTDATA,
        todayappointmentrefresh,
        APPOINTMENTLIST,
        getpatientapi,
        getappointmentapi,
        ALLROLE,
        getstaffdata,
        PASSDATAFROMSTAFFLIST,
        UPDATESTAFF,
        SELECTEDSIDEBAR,
        PASSUPDATEID,

        ID,
        MYPROFILE,
        PATIENTID,
        APPOINTMENTNO,
        DOCTORFEES,
        DOCTORLIST,
        CONFIRMEDPATIENTLIST,
        passdatatocomplaintform,
        COMPLAINTFORM,
        PAYMENTFORM,
        paymentformdata,
        refreshcomplaintlist,
        MARKCOMPLAINTLIST,
        MARKLABXRAYPATIENT,
        MARKPATIENTTYPE,
        LABFORMPASSDATA,
        XRAYFORMPASSDATA,
        XRAYNAMELIST,
        PATIENTIDFORBILL,
        BILLDATA,
        getdoctordata,
        GETREPORT,
        PATIENTRECORD,
        getpatientrecordapi,
        PAYMENTMODE,
        TREATMENTCOURSES,
        gettreatmentcourseapi,
        PATIENTIDFORLABBILL,
        PATIENTIDFORXRAYBILL,
        LABBILLDATA,
        XRAYBILLDATA,
        LABFORMDATA,
        LABREPORTUPLOAD,
        XRAYREPORTUPLOAD,
        VACATIONSLIST,
        getallvacationlist,
        DOCTORAVAILABILITY,
        getalldoctoravailability,
        getallslotsdata,
        APPOINTMENTSPERDAY,
        getappointmentsperdayapi,
        CONDITION_CATEGORY,
        SUB_CATEGORY,
        getconditioncategoryapi,
        getsubcategoryapi,
        ALLTREATMENTDATA,
        getalltreatmentdata,
        SESSIONDATA,
        getallsessiondata,
        TREATMENTCOURSEID,
        NUMBEROFSESSION,
        TOTALAPPOINTMENT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
