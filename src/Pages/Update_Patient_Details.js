import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const Update_Patient_Details = () => {
  const location = useLocation();
  const { row } = location.state || {};

  useEffect(() => {
    if (row) {
      console.log(row);
      let { street, city, state, zip, country } = row.address;
      let { name, phone, relationship } = row.emergencyContact;

      const formatDate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, "0");
        const day = `${d.getDate()}`.padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      };
      setForm({
        ...row,
        first_name: row.firstName,
        last_name: row.lastName,
        disease_name: row.diseaseName,
        street: street,
        city: city,
        state: state,
        zip: zip,
        country: country,
        emergencyname: name,
        emergencyphone: phone,
        emergencyrelationship: relationship,
        phone_no: row.phoneNo,
        alternate_phone_no: row.alternatePhoneNo,
        date_of_birth: row.dateOfBirth.split("T")[0],
      });
    }
  }, [row]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    alternate_phone_no: "",
    email: "",
    date_of_birth: "",
    gender: "",
    disease_name: "",
    referral: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    emergencyname: "",
    emergencyrelationship: "",
    emergencyphone: "",

    // appointment_date: "",
    // appointment_time: "",
    // weekday: "",
    // selected_slot: "",
    // appointed_doctor: "",
    // status: "",
  });

  const [availableSlots, setAvailableSlots] = useState("");
  const [doctorID, setDoctorID] = useState();

  const [formError, setFormError] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    alternate_phone_no: "",
    email: "",
    date_of_birth: "",
    gender: "",
    disease_name: "",
    referral: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    emergencyname: "",
    emergencyrelationship: "",
    emergencyphone: "",

    // appointment_no: "",
    // appointment_date: "",
    // appointment_time: "",
    // weekday: "",
    // // week_days_with_time: "",
    // selected_slot: "",

    // appointed_doctor: "",

    // disease_name: "",
    // status: "",
    // referral: "",
  });

  const navigate = useNavigate();

  // const [doctorslist, setDoctorsList] = useState([]);

  const {
    doctorlist,
    vacationslist,
    doctoravailability,
    appointmentlist,
    todayappointmentrefresh,
    getappointmentapi,
    getpatientapi,
  } = useContext(AppContext);

  const [vacations, setVacations] = useState([]);
  const [availability, setAvailability] = useState([]);

  const [filteredDoctorlist, setFilteredDoctorlist] = useState([]);

  // useEffect(() => {
  //   if (
  //     doctorlist.length > 0 &&
  //     form.appointment_date &&
  //     doctoravailability.length > 0
  //   ) {
  //     const selectedDate = new Date(form.appointment_date);
  //     const weekdayNames = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];

  //     const selectedDay = weekdayNames[selectedDate.getDay()];

  //     const availableDoctors = doctorlist.filter((doctor) =>
  //       doctoravailability.some(
  //         (avail) =>
  //           avail.doctorId === doctor._id &&
  //           avail.availableDays.some((day) => day.day === selectedDay)
  //       )
  //     );

  //     setFilteredDoctorlist(availableDoctors);
  //     console.log("this is filtered list", availableDoctors);
  //   }
  // }, [doctorlist, form.appointment_date, doctoravailability]);

  // useEffect(() => {
  //   if (
  //     doctorlist.length > 0 &&
  //     form.appointment_date &&
  //     doctoravailability.length > 0
  //   ) {
  //     const selectedDate = new Date(form.appointment_date);
  //     const weekdayNames = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];

  //     const selectedDay = weekdayNames[selectedDate.getDay()];

  //     // Filter doctors based on availability and ensure they are not on vacation
  //     const availableDoctors = doctorlist.filter((doctor) => {
  //       // Check if the doctor is available on the selected day
  //       const isAvailable = doctoravailability.some(
  //         (avail) =>
  //           avail.doctorId === doctor._id &&
  //           avail.availableDays.some((day) => day.day === selectedDay)
  //       );

  //       // Check if the doctor is on vacation on the selected date
  //       const isOnVacation = vacationslist?.some(
  //         (vacation) =>
  //           vacation.doctorId === doctor._id &&
  //           vacation.vacationDate.some((vacDate) => {
  //             const vacDateObj = new Date(vacDate);
  //             return (
  //               vacDateObj.getFullYear() === selectedDate.getFullYear() &&
  //               vacDateObj.getMonth() === selectedDate.getMonth() &&
  //               vacDateObj.getDate() === selectedDate.getDate()
  //             );
  //           })
  //       );

  //       // Include doctor if they are available and not on vacation
  //       return isAvailable && !isOnVacation;
  //     });

  //     setFilteredDoctorlist(availableDoctors);
  //     console.log("this is filtered list", availableDoctors);
  //   }
  // }, [doctorlist, form.appointment_date, vacationslist, doctoravailability]);

  const [time, setTime] = useState();
  // const abc = (e) => {
  //   const { value } = e.target;
  //   setTime(value);
  //   console.log(value);
  // };

  // useEffect(() => {
  //   let obj = doctorlist.find((e) => e.name == form.appointed_doctor);

  //   console.log(obj);
  //   if (obj) {
  //     console.log(obj._id);
  //     setDoctorID(obj._id);
  //   }
  // }, [form.appointed_doctor]);

  const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   if (doctorlist.length > 0) {
  //     const data = doctorlist.find((e) => e.name === form.appointed_doctor);

  //     console.log("hi");
  //     if (data) {
  //       const parser = new DOMParser();
  //       const doc = parser.parseFromString(data.weekDaysWithTime, "text/html");
  //       const paragraphs = doc.querySelectorAll("p");

  //       let allbooking = appointmentlist.filter((e) => e.doctorId == data._id);
  //       let totalbooking = allbooking.filter((e) => {
  //         let bookedDate = new Date(e.appointment_date)
  //           .toISOString()
  //           .split("T")[0];
  //         let selectedDate = new Date(form.appointment_date)
  //           .toISOString()
  //           .split("T")[0];
  //         return bookedDate === selectedDate;
  //       });

  //       console.log("total booking is ", totalbooking);
  //       const optionArray = Array.from(paragraphs).map((p) => p.textContent);

  //       setOptions(optionArray);
  //     } else {
  //       setOptions([]);
  //     }
  //   }
  // }, [doctorlist, form.appointed_doctor]);

  const validate = () => {
    let isValid = true;
    let errors = {
      first_name: "",
      last_name: "",

      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",

      phone_no: "",
      alternate_phone_no: "",

      date_of_birth: "",

      email: "",

      emergencyname: "",
      emergencyrelationship: "",
      emergencyphone: "",

      gender: "",

      appointment_date: "",
      appointment_time: "",
      weekday: "",
      selected_slot: "",

      appointed_doctor: "",

      disease_name: "",
      status: "",
      referral: "",
    };

    if (!form.first_name) {
      errors.first_name = "Please enter first name";
      isValid = false;
    }

    if (!form.last_name) {
      errors.last_name = "Please enter last name";
      isValid = false;
    }

    if (!form.disease_name) {
      errors.disease_name = "Please enter patient grade";
      isValid = false;
    }

    // if (!form.status) {
    //   errors.status = "Please select the status";
    //   isValid = false;
    // }

    if (!form.referral) {
      errors.referral = "Please enter the referral details";
      isValid = false;
    }

    if (!form.phone_no) {
      errors.phone_no = "Please enter phone number";
      isValid = false;
    }

    if (form.phone_no.toString().length != 10) {
      errors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!form.alternate_phone_no) {
      errors.alternate_phone_no = "Please enter alternate phone number";
      isValid = false;
    }

    if (form.alternate_phone_no.toString().length != 10) {
      errors.alternate_phone_no = "Phone number must be 10 digits";
      isValid = false;
    }

    if (form.phone_no === form.alternate_phone_no) {
      errors.alternate_phone_no = "Alternate phone number can not be same.";
      isValid = false;
    }

    if (!form.email) {
      errors.email = "Please enter email id";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.date_of_birth) {
      errors.date_of_birth = "Please enter date of birth";
      isValid = false;
    }

    if (!form.gender) {
      errors.gender = "Please select gender";
      isValid = false;
    }

    if (!form.street) {
      errors.street = "Please enter street name";
      isValid = false;
    }
    if (!form.city) {
      errors.city = "Please enter city name";
      isValid = false;
    }
    if (!form.state) {
      errors.state = "Please enter state name";
      isValid = false;
    }
    if (!form.zip) {
      errors.zip = "Please enter zip code";
      isValid = false;
    }

    if (6 < form.zip.toString().length > 6) {
      errors.zip = "Zip code must be 6 digits";
      isValid = false;
    }
    if (!form.country) {
      errors.country = "Please enter country name";
      isValid = false;
    }

    if (!form.emergencyname) {
      errors.emergencyname = "Please enter emergency contact name";
      isValid = false;
    }
    if (!form.emergencyrelationship) {
      errors.emergencyrelationship =
        "Please enter emergency contact relationship";
      isValid = false;
    }
    if (!form.emergencyphone) {
      errors.emergencyphone = "Please enter emergency contact number";
      isValid = false;
    }

    console.log("this data is passing", form);
    setFormError(errors);
    return isValid;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    if (validate()) {
      const obj = {
        firstName: form.first_name,
        lastName: form.last_name,
        phoneNo: form.phone_no,
        dateOfBirth: form.date_of_birth,
        alternatePhoneNo: form.alternate_phone_no,
        email: form.email,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
        gender: form.gender,
        diseaseName: form.disease_name,
        emergencyContact: {
          name: form.emergencyname,
          phone: form.emergencyphone,
          relationship: form.emergencyrelationship,
        },
        referral: form.referral,
      };

      console.log("this data will be send");
      console.log(obj);

      axios
        .put(`${medicalUrl}updatePatientRegister/${row._id}`, obj)
        .then((resp) => {
          console.log(resp);

          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          getpatientapi();
          navigate("/admin/Patient_List");
          // {
          //   location.pathname ==
          //   "/admin/Confirmed_Appointments/Patient_Registration"
          //     ? navigate("/admin/Confirmed_Appointments")
          //     : navigate("/admin/Appointment_List");
          // }

          let slotid = availableSlots.find(
            (e) => e.startTime == form.appointment_time
          );
          console.log("this is slot id", slotid._id);
          axios
            .post(`${medicalUrl}book-slot/${slotid._id}`)
            .then((resp) => {
              console.log("slot booked");
            })
            .catch((error) => {
              console.log("slot not booked", error);
            });
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        });
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "appointment_date") {
      const selectedDate = new Date(value);
      const weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const weekday = weekdayNames[selectedDate.getDay()];

      setForm((prevForm) => ({
        ...prevForm, // Spread previous state to keep other form fields
        appointment_date: value,
        weekday: weekday,
      }));
      validateField(name, value);
    } else {
      setForm((prevForm) => ({
        ...prevForm, // Spread previous state to keep other form fields
        [name]: value, // Update only the field that changed
      }));
      validateField(name, value);
    }
  };

  useEffect(() => {
    if (form.appointed_doctor && form.appointment_date && doctorID) {
      axios
        .get(`${medicalUrl}slots/${doctorID}/${form.appointment_date}`)
        .then((resp) => {
          let slotslist = resp.data;
          console.log(slotslist, "this is slots list");

          // Check if doctor is on vacation on the selected date
          const selectedDate = new Date(form.appointment_date);
          const isDoctorOnVacation = vacationslist.some(
            (vacation) =>
              vacation.doctorId === doctorID &&
              vacation.vacationDate.some((vacDate) => {
                const vacDateObj = new Date(vacDate);
                return (
                  vacDateObj.getFullYear() === selectedDate.getFullYear() &&
                  vacDateObj.getMonth() === selectedDate.getMonth() &&
                  vacDateObj.getDate() === selectedDate.getDate()
                );
              })
          );

          // Clear slots if the doctor is on vacation
          if (isDoctorOnVacation) {
            setAvailableSlots([]);
            console.log("Doctor is on vacation, clearing slots.");
          } else {
            // Filter available slots
            let filterslots = slotslist.filter((e) => e.available === true);
            console.log(filterslots, "filtered slots");
            setAvailableSlots(filterslots);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If appointed doctor or date is missing, clear the available slots
      setAvailableSlots([]);
      console.log("Doctor or appointment date is missing, clearing slots");
    }
  }, [form.appointed_doctor, doctorID, form.appointment_date, vacationslist]);

  /*------------------*/

  const selectedDoct = (e) => {
    const { name, value } = e.target;

    setForm(() => ({
      ...form,
      appointed_doctor: value,
    }));
  };

  const validateField = (name, value) => {
    let isValid = true;
    let errors = { ...formError };
    switch (name) {
      case "status":
        if (!value) {
          errors.status = "Please select the status";
          isValid = false;
        } else {
          errors.status = "";
        }
        break;

      case "referral":
        if (!value) {
          errors.referral = "Please enter the referral details";
          isValid = false;
        } else {
          errors.referral = "";
        }

        break;

      case "appointed_doctor":
        if (!value) {
          errors.appointed_doctor = "Please select the doctor name";
          isValid = false;
        } else {
          errors.appointed_doctor = "";
        }

        break;

      case "selected_slot":
        if (!value) {
          errors.selected_slot = "Please select the available slot";
          isValid = false;
        } else {
          errors.selected_slot = "";
        }

        break;

      case "first_name":
        if (!value) {
          errors.first_name = "Please enter first name";
          isValid = false;
        } else {
          errors.first_name = "";
        }
        break;

      case "last_name":
        if (!value) {
          errors.last_name = "Please enter last name";
          isValid = false;
        } else {
          errors.last_name = "";
        }
        break;

      case "phone_no":
        if (!value) {
          errors.phone_no = "Please enter phone number";
          isValid = false;
        } else if (value.toString().length != 10) {
          errors.phone_no = "Phone number must be 10 digits";
          isValid = false;
        } else {
          errors.phone_no = "";
        }
        break;

      case "alternate_phone_no":
        if (!value) {
          errors.alternate_phone_no = "Please enter alternate phone number";
          isValid = false;
        } else if (value.toString().length != 10) {
          errors.alternate_phone_no = "Phone number must be 10 digits";
          isValid = false;
        } else if (value == form.phone_no) {
          errors.alternate_phone_no = "Aleternate phone number can not be same";
          isValid = false;
        } else {
          errors.alternate_phone_no = "";
        }
        break;

      case "email":
        if (!value) {
          errors.email = "Please enter email id";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Please enter a valid email address";
          isValid = false;
        } else {
          errors.email = "";
        }
        break;

      case "date_of_birth":
        if (!value) {
          errors.date_of_birth = "Please enter date of birth";
          isValid = false;
        } else {
          errors.date_of_birth = "";
        }
        break;

      case "gender":
        if (!value) {
          errors.gender = "Please select gender";
          isValid = false;
        } else {
          errors.gender = "";
        }
        break;

      case "street":
        if (!value) {
          errors.street = "Please enter street name";
          isValid = false;
        } else {
          errors.street = "";
        }
        break;

      case "city":
        if (!value) {
          errors.city = "Please enter city name";
          isValid = false;
        } else {
          errors.city = "";
        }
        break;

      case "state":
        if (!value) {
          errors.state = "Please enter state name";
          isValid = false;
        } else {
          errors.state = "";
        }
        break;

      case "zip":
        if (!value) {
          errors.zip = "Please enter zip code";
          isValid = false;
        } else if (value.toString().length != 6) {
          errors.zip = "Zip code must be 6 digits";
          isValid = false;
        } else {
          errors.zip = "";
        }
        break;

      case "country":
        if (!value) {
          errors.country = "Please enter country name";
          isValid = false;
        } else {
          errors.country = "";
        }
        break;

      case "emergencyname":
        if (!value) {
          errors.emergencyname = "Please enter emergency contact name";
          isValid = false;
        } else {
          errors.emergencyname = "";
        }
        break;

      case "emergencyrelationship":
        if (!value) {
          errors.emergencyrelationship =
            "Please enter emergency contact relationship";
          isValid = false;
        } else {
          errors.emergencyrelationship = "";
        }
        break;

      case "emergencyphone":
        if (!value) {
          errors.emergencyphone = "Please enter emergency contact number";
          isValid = false;
        } else if (value.toString().length != 10) {
          errors.emergencyphone = "Please enter 10 digit number";
          isValid = false;
        } else if (value == form.phone_no || value == form.alternate_phone_no) {
          errors.emergencyphone = "Please provide different number";
          isValid = false;
        } else {
          errors.emergencyphone = "";
        }
        break;

      case "disease_name":
        if (!value) {
          errors.disease_name = "Please enter patient grade";
          isValid = false;
        } else {
          errors.disease_name = "";
        }
        break;

      case "appointment_time":
        if (!value) {
          errors.appointment_time = "Please enter appointment time";
          isValid = false;
        } else {
          errors.appointment_time = "";
        }
        break;

      case "appointment_date":
        if (!value) {
          errors.appointment_date = "Please enter appointment date";
          isValid = false;
        } else {
          errors.appointment_date = "";
        }

        break;

      default:
        break;
    }

    setFormError(errors);
  };

  useEffect(() => {
    if (availableSlots) {
      console.log(availableSlots, "this is available slots ");
    }
  }, [availableSlots]);

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Update Patient Details</h5>
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
                  {/* <h5 className="emergencycontactdetails">
                    Appointment Details
                  </h5> */}
                  {/*
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputappointmentno" className="form-label">
                      Appointment No
                    </label>
                    <input
                      type="text"
                      name="appointment_no"
                      className="form-control"
                      id="inputappointmentno"
                      placeholder="Appointment No"
                      value={`A-${appointmentlist.length + 1}`}
                      disabled="true"
                    />
                  </div> */}

                  {/* <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDate" className="form-label">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="appointment_date"
                      id="inputDate"
                      placeholder="Appointment Date"
                      value={form.appointment_date || ""}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]} // Set min date to today
                    />
                    <span className="bookingerror">
                      {formError.appointment_date}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputWeekday" className="form-label">
                      Selected Weekday
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputWeekday"
                      value={form.weekday}
                      disabled={true}
                    />
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="appointed_doctor" className="form-label">
                      Appointed Doctor Name
                    </label>

                    <select
                      className="form-select"
                      name="appointed_doctor"
                      id="appointed_doctor"
                      value={form.appointed_doctor}
                      onChange={selectedDoct}
                    >
                      <option value={""} disabled>
                        Select Doctor
                      </option>
                      {filteredDoctorlist.length > 0 &&
                        filteredDoctorlist.map((e) => (
                          <option key={e._id} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                    </select>

                    <span className="bookingerror">
                      {formError.appointed_doctor}
                    </span>
                  </div> */}
                  {/*
                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputselected_slot" className="form-label">
                      Available Slots
                    </label>
                    <select
                      type="text"
                      className="form-select"
                      id="inputselected_slot"
                      name="selected_slot"
                      value={form.selected_slot || ""}
                      onChange={handlechange}
                    >
                      <option value="" disabled>
                        Available Slots
                      </option>
                      {options.map((e, index) => (
                        <option key={index} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>

                    <span className="bookingerror">
                      {formError.selected_slot}
                    </span>
                  </div> */}
                  {/* <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputselected_slot" className="form-label">
                      Available Slots
                    </label>
                    <select
                      className="form-select"
                      id="inputselected_slot"
                      name="appointment_time"
                      onChange={handlechange}
                      value={form.appointment_time || {}}
                    >
                      <option value="" disabled>
                        Available Slots
                      </option>
                      {availableSlots.length > 0 ? (
                        availableSlots.map((slot, index) => (
                          <option key={index} value={slot.startTime}>
                            {slot.startTime}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No slots available
                        </option>
                      )}
                    </select>
                  </div> */}

                  {/* <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="selectstatus" className="form-label">
                      Select Status
                    </label>
                    <select
                      id="selectstatus"
                      className="form-select"
                      name="status"
                      onChange={handlechange}
                      value={form.status || ""}
                      // Remove disabled attribute if not needed
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="Done">Done</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Reschedule">Reschedule</option>
                      <option value="No Show">No Show</option>
                    </select>
                    <span className="bookingerror">{formError.status}</span>
                  </div> */}

                  {/* <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputTime" className="form-label">
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      name="appointment_time"
                      id="inputTime"
                      value={form.appointment_time}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.appointment_time}
                    </span>
                  </div> */}

                  <h5>Patient Details</h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="First Name"
                      name="first_name"
                      value={form.first_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.first_name}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputLast_Name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLast_Name"
                      name="last_name"
                      placeholder="Last Name"
                      value={form.last_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.last_name}</span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone_no"
                      className="form-control"
                      id="inputPhone"
                      placeholder="Phone"
                      value={form.phone_no || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.phone_no}</span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label htmlFor="inputalternatePhone" className="form-label">
                      Alternate Phone
                    </label>
                    <input
                      type="number"
                      name="alternate_phone_no"
                      className="form-control"
                      id="inputalternatePhone"
                      placeholder="Enter Alternate Phone Number"
                      value={form.alternate_phone_no || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.alternate_phone_no}
                    </span>
                  </div>

                  <div className="col-md-6 col-lg-4 inputdivs">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={form.email || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.email}</span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDateofbirth" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputDateofbirth"
                      name="date_of_birth"
                      placeholder="Date of Birth"
                      value={form.date_of_birth || ""}
                      onChange={handlechange}
                      max={new Date().toISOString().split("T")[0]} // Set max date to today
                    />
                    <span className="bookingerror">
                      {formError.date_of_birth}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="selectgender" className="form-label">
                      Select Gender
                    </label>
                    <select
                      id="selectgender"
                      className="form-select"
                      name="gender"
                      onChange={handlechange}
                      value={form.gender || ""}
                      // Remove disabled attribute if not needed
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                    <span className="bookingerror">{formError.gender}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputdiseasename" className="form-label">
                      Patient Grade
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputdiseasename"
                      name="disease_name"
                      placeholder="Enter Patient Grade"
                      value={form.disease_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.disease_name}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputreferral" className="form-label">
                      Referral Details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputreferral"
                      name="referral"
                      placeholder="Enter referral details"
                      value={form.referral || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.referral}</span>
                  </div>

                  <h5 className="addressdetails">Address Details</h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputstreet" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputstreet"
                      name="street"
                      placeholder="Enter Street Name"
                      value={form.street || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.street}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputcity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputcity"
                      name="city"
                      placeholder="Enter City Name"
                      value={form.city || ""}
                      // Remove disabled attribute if not needed
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.city}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputstate" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="inputstate"
                      placeholder="Enter State Name"
                      value={form.state || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.state}</span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label htmlFor="inputzipcode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zip"
                      className="form-control"
                      id="inputzipcode"
                      placeholder="Enter Zip Code"
                      value={form.zip || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.zip}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputcountry" className="form-label">
                      Country Name
                    </label>
                    <input
                      name="country"
                      type="text"
                      className="form-control"
                      id="inputcountry"
                      placeholder="Enter Country Name"
                      value={form.country || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.country}</span>
                  </div>

                  <h5 className="emergencycontactdetails">
                    Emergency Contact Details
                  </h5>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactname"
                      className="form-label"
                    >
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyname"
                      className="form-control"
                      id="inputemergencycontactname"
                      placeholder="Enter Emergency Contact Name"
                      value={form.emergencyname || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergencyname}
                    </span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactrelationship"
                      className="form-label"
                    >
                      Emergency Contact Relationship
                    </label>
                    <input
                      name="emergencyrelationship"
                      type="text"
                      className="form-control"
                      id="inputemergencycontactrelationship"
                      placeholder="Enter Emergency Contact Relationship"
                      value={form.emergencyrelationship || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergencyrelationship}
                    </span>
                  </div>

                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactphone"
                      className="form-label"
                    >
                      Emergency Contact Phone
                    </label>
                    <input
                      type="number"
                      name="emergencyphone"
                      className="form-control"
                      id="inputemergencycontactphone"
                      placeholder="Enter Emergency Phone Number"
                      value={form.emergencyphone || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.emergencyphone}
                    </span>
                  </div>

                  {/* <div className="col-md-12 col-lg-4 inputdivs">
                    <label htmlFor="inputDate" className="form-label">
                      Appointment time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      name="appointment_date"
                      id="inputDate"
                      placeholder="Appointment Date"
                      value={time}
                      // Remove disabled attribute if not needed
                      onChange={abc}
                    />
                  </div> */}

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Update Details <i className="fa fa-arrow-right" />
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
