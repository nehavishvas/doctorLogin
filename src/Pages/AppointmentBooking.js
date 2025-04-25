import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const AppointmentBooking = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    // first_name: "",
    // last_name: "",
    // street: "",
    // city: "",
    // state: "",
    // zip: "",
    // country: "",
    // phone_no: "",
    // alternate_phone_no: "",
    // date_of_birth: "",
    // email: "",
    // emergencyname: "",
    // emergencyrelationship: "",
    // emergencyphone: "",
    // gender: "",
    appointment_date: "",
    weekday: "",
    appointed_doctor: "",
    appointment_time: "",
    status: "",
    patient_registration: "",

    // selected_slot: "",

    // disease_name: "",
    // referral: "",
  });

  const [availableSlots, setAvailableSlots] = useState("");
  const [doctorID, setDoctorID] = useState();

  const [formError, setFormError] = useState({
    appointment_date: "",
    patient_registration: "",
    weekday: "",
    appointed_doctor: "",
    appointment_time: "",
    status: "",

    // first_name: "",
    // last_name: "",

    // street: "",
    // city: "",
    // state: "",
    // zip: "",
    // country: "",

    // phone_no: "",
    // alternate_phone_no: "",

    // date_of_birth: "",

    // email: "",

    // emergencyname: "",
    // emergencyrelationship: "",
    // emergencyphone: "",

    // gender: "",

    // // appointment_no: "",
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
    patientlist,
    appointmentsperday,
  } = useContext(AppContext);

  useEffect(() => {
    if (patientlist) {
      console.log(
        "this is patient registration in appointment booking",
        patientlist
      );
    }
  }, [patientlist]);
  // const [vacations, setVacations] = useState([]);
  // const [availability, setAvailability] = useState([]);

  const [filteredDoctorlist, setFilteredDoctorlist] = useState([]);

  useEffect(() => {
    if (form.appointment_date) {
      checkTotalAppointments(form.appointment_date);
    }
  }, [form.appointment_date]);
  const checkTotalAppointments = (selectedDate) => {
    let isValid = true;
    const appointmentDate = selectedDate.split("T")[0]; // Extract date part from the selected date

    // Filter appointments for the selected date
    const selectedDateAppointments = appointmentlist.filter(
      (appointment) =>
        appointment.appointment_date.split("T")[0] === appointmentDate
    );

    // Check if the number of appointments for the selected date exceeds the limit
    if (
      selectedDateAppointments.length >=
      Number(appointmentsperday?.appointmentPerDay)
    ) {
      Swal.fire({
        title: `Appointments for ${appointmentDate} are Full`,
        text: `Appointments per day limit is ${appointmentsperday.appointmentPerDay}`,
        icon: "warning",
        confirmButtonColor: "rgb(41, 75, 147)",
        showConfirmButton: true,
      });

      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (
      doctorlist.length > 0 &&
      form.appointment_date &&
      doctoravailability.length > 0
    ) {
      const selectedDate = new Date(form.appointment_date);
      const weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const selectedDay = weekdayNames[selectedDate.getDay()];

      const availableDoctors = doctorlist.filter((doctor) =>
        doctoravailability.some(
          (avail) =>
            avail.doctorId === doctor._id &&
            avail.availableDays.some((day) => day.day === selectedDay)
        )
      );

      setFilteredDoctorlist(availableDoctors);
      console.log("this is filtered list", availableDoctors);
    }
  }, [doctorlist, form.appointment_date, doctoravailability]);

  useEffect(() => {
    if (
      doctorlist.length > 0 &&
      form.appointment_date &&
      doctoravailability.length > 0
    ) {
      const selectedDate = new Date(form.appointment_date);
      const weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const selectedDay = weekdayNames[selectedDate.getDay()];

      // Filter doctors based on availability and ensure they are not on vacation
      const availableDoctors = doctorlist.filter((doctor) => {
        // Check if the doctor is available on the selected day
        const isAvailable = doctoravailability.some(
          (avail) =>
            avail.doctorId === doctor._id &&
            avail.availableDays.some((day) => day.day === selectedDay)
        );

        // Check if the doctor is on vacation on the selected date
        const isOnVacation = vacationslist?.some(
          (vacation) =>
            vacation.doctorId === doctor._id &&
            vacation.vacationDate.some((vacDate) => {
              const vacDateObj = new Date(vacDate);
              return (
                vacDateObj.getFullYear() === selectedDate.getFullYear() &&
                vacDateObj.getMonth() === selectedDate.getMonth() &&
                vacDateObj.getDate() === selectedDate.getDate()
              );
            })
        );

        // Include doctor if they are available and not on vacation
        return isAvailable && !isOnVacation;
      });

      setFilteredDoctorlist(availableDoctors);
      console.log("this is filtered list", availableDoctors);
    }
  }, [doctorlist, form.appointment_date, vacationslist, doctoravailability]);

  const [time, setTime] = useState();
  const abc = (e) => {
    const { value } = e.target;
    setTime(value);
    console.log(value);
  };

  // useEffect(() => {
  //   let obj = doctorlist.find((e) => e.name == form.appointed_doctor);

  //   console.log(obj);
  //   if (obj) {
  //     console.log(obj._id);
  //     setDoctorID(obj._id);
  //   }
  // }, [form.appointed_doctor]);

  // useEffect(() => {
  //   if (doctorlist && doctorlist.length > 0) {
  //     let doctorid = doctorlist[0]._id;
  //     setDoctorID(doctorid);

  //     console.log(doctorid);
  //   }
  // }, [doctorlist]);

  useEffect(() => {
    if (form.appointed_doctor) {
      console.log(form.appointed_doctor);
      setDoctorID(form.appointed_doctor);
    }
  }, [form.appointed_doctor]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (doctorlist.length > 0) {
      const data = doctorlist.find((e) => e._id === form.appointed_doctor);

      console.log("hi");
      if (data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.weekDaysWithTime, "text/html");
        const paragraphs = doc.querySelectorAll("p");

        let allbooking = appointmentlist.filter((e) => e.doctorId == data._id);
        let totalbooking = allbooking.filter((e) => {
          let bookedDate = new Date(e.appointment_date)
            .toISOString()
            .split("T")[0];
          let selectedDate = new Date(form.appointment_date)
            .toISOString()
            .split("T")[0];
          return bookedDate === selectedDate;
        });

        console.log("total booking is ", totalbooking);
        const optionArray = Array.from(paragraphs).map((p) => p.textContent);

        setOptions(optionArray);
      } else {
        setOptions([]);
      }
    }
  }, [doctorlist, form.appointed_doctor]);

  const validate = () => {
    let isValid = true;
    let errors = {
      appointment_date: "",
      // weekday: "",
      appointed_doctor: "",
      appointment_time: "",
      // status: "",
      patient_registration: "",

      // first_name: "",
      // last_name: "",

      // street: "",
      // city: "",
      // state: "",
      // zip: "",
      // country: "",

      // phone_no: "",
      // alternate_phone_no: "",

      // date_of_birth: "",

      // email: "",

      // emergencyname: "",
      // emergencyrelationship: "",
      // emergencyphone: "",

      // gender: "",

      // appointment_date: "",
      // appointment_time: "",
      // weekday: "",
      // selected_slot: "",

      // appointed_doctor: "",

      // disease_name: "",
      // status: "",
      // referral: "",
    };

    // if (!form.first_name) {
    //   errors.first_name = "Please enter first name";
    //   isValid = false;
    // }

    // if (!form.last_name) {
    //   errors.last_name = "Please enter last name";
    //   isValid = false;
    // }

    // if (!form.disease_name) {
    //   errors.disease_name = "Please enter disease name";
    //   isValid = false;
    // }

    // if (!form.status) {
    //   errors.status = "Please select the status";
    //   isValid = false;
    // }

    // if (!form.referral) {
    //   errors.referral = "Please enter the referral details";
    //   isValid = false;
    // }

    // if (!form.selected_slot) {
    //   errors.selected_slot = "Please select the available slot";
    //   isValid = false;
    // }
    // if (!form.phone_no) {
    //   errors.phone_no = "Please enter phone number";
    //   isValid = false;
    // }

    // if (form.phone_no.toString().length != 10) {
    //   errors.phone = "Phone number must be 10 digits";
    //   isValid = false;
    // }

    // if (!form.alternate_phone_no) {
    //   errors.alternate_phone_no = "Please enter alternate phone number";
    //   isValid = false;
    // }

    // if (form.alternate_phone_no.toString().length != 10) {
    //   errors.alternate_phone_no = "Phone number must be 10 digits";
    //   isValid = false;
    // }

    // if (form.phone_no === form.alternate_phone_no) {
    //   errors.alternate_phone_no = "Alternate phone number can not be same.";
    //   isValid = false;
    // }

    // if (!form.email) {
    //   errors.email = "Please enter email id";
    //   isValid = false;
    // }

    // if (!/\S+@\S+\.\S+/.test(form.email)) {
    //   errors.email = "Please enter a valid email address";
    //   isValid = false;
    // }

    // if (!form.date_of_birth) {
    //   errors.date_of_birth = "Please enter date of birth";
    //   isValid = false;
    // }

    // if (!form.gender) {
    //   errors.gender = "Please select gender";
    //   isValid = false;
    // }

    // if (!form.street) {
    //   errors.street = "Please enter street name";
    //   isValid = false;
    // }
    // if (!form.city) {
    //   errors.city = "Please enter city name";
    //   isValid = false;
    // }
    // if (!form.state) {
    //   errors.state = "Please enter state name";
    //   isValid = false;
    // }
    // if (!form.zip) {
    //   errors.zip = "Please enter zip code";
    //   isValid = false;
    // }

    // if (6 < form.zip.toString().length > 6) {
    //   errors.zip = "Zip code must be 6 digits";
    //   isValid = false;
    // }
    // if (!form.country) {
    //   errors.country = "Please enter country name";
    //   isValid = false;
    // }

    // if (!form.emergencyname) {
    //   errors.emergencyname = "Please enter emergency contact name";
    //   isValid = false;
    // }
    // if (!form.emergencyrelationship) {
    //   errors.emergencyrelationship =
    //     "Please enter emergency contact relationship";
    //   isValid = false;
    // }
    // if (!form.emergencyphone) {
    //   errors.emergencyphone = "Please enter emergency contact number";
    //   isValid = false;
    // }

    if (!form.appointed_doctor) {
      errors.appointed_doctor = "Please select the doctor name";
      isValid = false;
    }

    // if (!form.selected_slot) {
    //   errors.selected_slot = "Please select the available slot";
    //   isValid = false;
    // }
    if (!form.appointment_date) {
      errors.appointment_date = "Please enter appointment date";
      isValid = false;
    }

    if (!form.appointment_time) {
      errors.appointment_time = "Please select the slot";
      isValid = false;
    }

    if (!form.patient_registration) {
      errors.patient_registration = "Please select patient registration";
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
        appointment_date: form.appointment_date,
        patientId: form.patient_registration,
        appointment_time: form.appointment_time,
      };

      console.log("this data will be send");
      console.log(obj);

      axios
        .post(`${medicalUrl}appointmentRegister/${doctorID}`, obj)
        .then((resp) => {
          console.log(resp);

          Swal.fire({
            title: "Registration Successfully",
            icon: "success",
            confirmButtonColor: "rgb(41, 75, 147)",
            showConfirmButton: true,
          });

          getappointmentapi();

          navigate("/admin/Appointment_List");

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
          console.error("Error patient registration:", error);
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
        ...prevForm,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  useEffect(() => {
    if (form.appointment_date && form.appointed_doctor) {
      // Fetch the doctor's details from the doctorList using the appointed_doctor ID
      const selectedDoctor = doctorlist.find(
        (doc) => doc._id === form.appointed_doctor
      );

      axios
        .get(
          `${medicalUrl}slots/${form.appointed_doctor}/${form.appointment_date}`
        )
        .then((resp) => {
          let slotslist = resp.data;
          console.log(slotslist, "this is slots list");

          // Check if the doctor is on vacation
          const selectedDate = new Date(form.appointment_date);
          const isDoctorOnVacation = vacationslist.some(
            (vacation) =>
              vacation.doctorId === form.appointed_doctor &&
              vacation.vacationDate.some((vacDate) => {
                const vacDateObj = new Date(vacDate);
                return (
                  vacDateObj.getFullYear() === selectedDate.getFullYear() &&
                  vacDateObj.getMonth() === selectedDate.getMonth() &&
                  vacDateObj.getDate() === selectedDate.getDate()
                );
              })
          );

          // If the doctor is on vacation, clear slots
          if (isDoctorOnVacation) {
            setAvailableSlots([]);
            console.log("Doctor is on vacation, clearing slots.");
          } else {
            // Count the number of appointments for the selected doctor on the given day
            const appointmentsForDoctor = appointmentlist.filter(
              (appointment) =>
                appointment.doctorId === form.appointed_doctor &&
                new Date(appointment.appointment_date).toDateString() ===
                  selectedDate.toDateString()
            );

            // If the number of appointments has reached or exceeded the doctor's limit, clear slots
            if (
              appointmentsForDoctor.length >= selectedDoctor?.appointmentPerDay
            ) {
              setAvailableSlots([]);
              console.log(
                "All appointments for the day are booked, clearing slots."
              );
            } else {
              // Otherwise, filter slots based on availability
              let filterslots = slotslist.filter((e) => e.available === true);
              console.log(filterslots, "filtered slots");

              setAvailableSlots(filterslots);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAvailableSlots([]);
      console.log("Doctor or appointment date is missing, clearing slots");
    }
  }, [
    doctorID,
    form.appointment_date,
    form.appointed_doctor,
    vacationslist,
    appointmentlist,
  ]);

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
          errors.disease_name = "Please enter disease name";
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

      case "patient_registration":
        if (!value) {
          errors.patient_registration =
            "Please select the patient registration no";
          isValid = false;
        } else {
          errors.patient_registration = "";
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
              <h5 className="addpatient">Add Appointment</h5>
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
                  <h5 className="emergencycontactdetails">
                    Appointment Details
                  </h5>

                  <div className="col-md-12 col-lg-4 inputdivs">
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
                          <option key={e._id} value={e._id}>
                            {e.name}
                          </option>
                        ))}
                    </select>

                    <span className="bookingerror">
                      {formError.appointed_doctor}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
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
                        Select Slot
                      </option>
                      {availableSlots.length > 0 ? (
                        availableSlots.map((slot, index) => (
                          <option key={index} value={slot.startTime}>
                            {slot.startTime} - {slot.endTime}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No slots available
                        </option>
                      )}
                    </select>

                    <span className="bookingerror">
                      {formError.appointment_time}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs">
                    <label
                      htmlFor="selectpatientregistratiton"
                      className="form-label"
                    >
                      Select Patient Registration No
                    </label>
                    <select
                      id="selectpatientregistratiton"
                      className="form-select"
                      name="patient_registration"
                      onChange={handlechange}
                      value={form.patient_registration || ""}
                    >
                      <option value="" disabled>
                        Select Patient Registraion No
                      </option>

                      {patientlist.map((e) => (
                        <option value={e._id}>
                          {e.registrationNo} - {e.firstName} {e.lastName}
                        </option>
                      ))}
                    </select>
                    <span className="bookingerror">
                      {formError.patient_registration}
                    </span>
                  </div>

                  <div className="col-md-12 col-lg-4 inputdivs displaynoneinputs">
                    <label htmlFor="selectstatus" className="form-label">
                      Select Status
                    </label>
                    <select
                      id="selectstatus"
                      className="form-select"
                      name="status"
                      onChange={handlechange}
                      value={form.status || ""}
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
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Add Appointment <i className="fa fa-arrow-right" />
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
