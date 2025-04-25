import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import { FourMp, FourMpRounded } from "@mui/icons-material";

export const Risk_Assessment_Form = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    full_name: "",
    student_id: "",
    date_of_birth: "",
    email: "",

    emergencyname: "",
    emergencyrelationship: "",
    emergencyphone: "",
    emergencytelephone: "",
    questions: {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
      seventh: "",
      eighth: "",
      ninth: "",
      tenth: "",
      eleventh: "",
      twelfth: "",
      thirteenth: "",
      fourteenth: "",
      fifteenth: "",
      sixteenth: "",
      seventeenth: "",
      eighteenth: "",
      nineteenth: "",
      twentieth: "",
      twenty_first: "",
    },

    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",

    phone_no: "",
    alternate_phone_no: "",

    gender: "",

    appointment_no: "",
    appointment_date: "",
    appointment_time: "",
    weekday: "",
    // week_days_with_time: "",

    selected_slot: "",

    appointed_doctor: "",

    disease_name: "",
    status: "",
    referral: "",
  });

  const [availableSlots, setAvailableSlots] = useState("");
  const [doctorID, setDoctorID] = useState();

  const [formError, setFormError] = useState({
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

    appointment_no: "",
    appointment_date: "",
    appointment_time: "",
    weekday: "",
    // week_days_with_time: "",
    selected_slot: "",

    appointed_doctor: "",

    disease_name: "",
    status: "",
    referral: "",
  });

  const navigate = useNavigate();

  // Utility function to convert 24-hour time to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    if (!time || !time.includes(":")) {
      return ""; // Return empty if the time is invalid or not in expected format
    }

    let [hours, minutes] = time.split(":").map(Number);
    let period = "AM";

    // Ensure hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "Invalid time";
    }

    // Convert to 12-hour format
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12; // Midnight case
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const appointmentTime24 = form.appointment_time; // The time in 24-hour format from input
    const appointmentTime12 = convertTo12HourFormat(appointmentTime24); // Convert to 12-hour with AM/PM

    if (appointmentTime12 !== "Invalid time") {
      form.appointment_time = appointmentTime12;
      console.log("Appointment Time (12-hour):", appointmentTime12); // This will log time with AM/PM
    } else {
      console.error("Invalid appointment time.");
    }
  };

  useEffect(() => {
    if (form.appointment_time && form.appointment_time.includes(":")) {
      handleSubmit(); // Convert the time when it's valid
    }
  }, [form.appointment_time]);

  // const [doctorslist, setDoctorsList] = useState([]);

  const {
    doctorlist,
    vacationslist,
    doctoravailability,
    appointmentlist,
    todayappointmentrefresh,
    getappointmentapi,
  } = useContext(AppContext);

  const [vacations, setVacations] = useState([]);
  const [availability, setAvailability] = useState([]);

  // useEffect(() => {
  //   if (vacationslist && doctoravailability) {
  //     setVacations(vacationslist);
  //     setAvailability(doctoravailability);
  //     console.log(vacationslist, "this is vacations list");
  //     console.log(doctoravailability, "this is doctor availability");
  //   }
  // }, [vacationslist, doctoravailability]);

  const [filteredDoctorlist, setFilteredDoctorlist] = useState([]);

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
  useEffect(() => {
    if (appointmentlist) {
      setForm({ ...form, appointment_no: `A-${appointmentlist.length + 1}` });
    }
  }, [appointmentlist]);

  useEffect(() => {
    let obj = doctorlist.find((e) => e.name == form.appointed_doctor);

    console.log(obj);
    if (obj) {
      console.log(obj._id);
      setDoctorID(obj._id);
    }
  }, [form.appointed_doctor]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (doctorlist.length > 0) {
      const data = doctorlist.find((e) => e.name === form.appointed_doctor);

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

  // const validate = () => {
  //   let isValid = true;
  //   let errors = {
  //     first_name: "",
  //     last_name: "",

  //     street: "",
  //     city: "",
  //     state: "",
  //     zip: "",
  //     country: "",

  //     phone_no: "",
  //     alternate_phone_no: "",

  //     date_of_birth: "",

  //     email: "",

  //     emergencyname: "",
  //     emergencyrelationship: "",
  //     emergencyphone: "",

  //     gender: "",

  //     appointment_no: "",
  //     appointment_date: "",
  //     appointment_time: "",
  //     weekday: "",
  //     // week_days_with_time: "",
  //     selected_slot: "",

  //     appointed_doctor: "",

  //     disease_name: "",
  //     status: "",
  //     referral: "",
  //   };

  //   if (!form.first_name) {
  //     errors.first_name = "Please enter first name";
  //     isValid = false;
  //   }

  //   if (!form.last_name) {
  //     errors.last_name = "Please enter last name";
  //     isValid = false;
  //   }

  //   if (!form.disease_name) {
  //     errors.disease_name = "Please enter disease name";
  //     isValid = false;
  //   }

  //   if (!form.status) {
  //     errors.status = "Please select the status";
  //     isValid = false;
  //   }

  //   if (!form.referral) {
  //     errors.referral = "Please enter the referral details";
  //     isValid = false;
  //   }

  //   if (!form.selected_slot) {
  //     errors.selected_slot = "Please select the available slot";
  //     isValid = false;
  //   }
  //   if (!form.phone_no) {
  //     errors.phone_no = "Please enter phone number";
  //     isValid = false;
  //   }

  //   if (form.phone_no.toString().length != 10) {
  //     errors.phone = "Phone number must be 10 digits";
  //     isValid = false;
  //   }

  //   if (!form.alternate_phone_no) {
  //     errors.alternate_phone_no = "Please enter alternate phone number";
  //     isValid = false;
  //   }

  //   if (form.alternate_phone_no.toString().length != 10) {
  //     errors.alternate_phone_no = "Phone number must be 10 digits";
  //     isValid = false;
  //   }

  //   if (form.phone_no === form.alternate_phone_no) {
  //     errors.alternate_phone_no = "Alternate phone number can not be same.";
  //     isValid = false;
  //   }

  //   if (!form.email) {
  //     errors.email = "Please enter email id";
  //     isValid = false;
  //   }

  //   if (!/\S+@\S+\.\S+/.test(form.email)) {
  //     errors.email = "Please enter a valid email address";
  //     isValid = false;
  //   }

  //   if (!form.date_of_birth) {
  //     errors.date_of_birth = "Please enter date of birth";
  //     isValid = false;
  //   }

  //   if (!form.gender) {
  //     errors.gender = "Please select gender";
  //     isValid = false;
  //   }

  //   if (!form.street) {
  //     errors.street = "Please enter street name";
  //     isValid = false;
  //   }
  //   if (!form.city) {
  //     errors.city = "Please enter city name";
  //     isValid = false;
  //   }
  //   if (!form.state) {
  //     errors.state = "Please enter state name";
  //     isValid = false;
  //   }
  //   if (!form.zip) {
  //     errors.zip = "Please enter zip code";
  //     isValid = false;
  //   }

  //   if (6 < form.zip.toString().length > 6) {
  //     errors.zip = "Zip code must be 6 digits";
  //     isValid = false;
  //   }
  //   if (!form.country) {
  //     errors.country = "Please enter country name";
  //     isValid = false;
  //   }

  //   if (!form.emergencyname) {
  //     errors.emergencyname = "Please enter emergency contact name";
  //     isValid = false;
  //   }
  //   if (!form.emergencyrelationship) {
  //     errors.emergencyrelationship =
  //       "Please enter emergency contact relationship";
  //     isValid = false;
  //   }
  //   if (!form.emergencyphone) {
  //     errors.emergencyphone = "Please enter emergency contact number";
  //     isValid = false;
  //   }

  //   if (!form.appointment_no) {
  //     errors.appointment_no = "Please enter appointment number";
  //     isValid = false;
  //   }

  //   if (!form.appointed_doctor) {
  //     errors.appointed_doctor = "Please select the doctor name";
  //     isValid = false;
  //   }

  //   if (!form.appointment_date) {
  //     errors.appointment_date = "Please enter appointment date";
  //     isValid = false;
  //   }

  //   if (!form.appointment_time) {
  //     errors.appointment_time = "Please enter appointment time";
  //     isValid = false;
  //   }

  //   if (!form.selected_slot) {
  //     errors.selected_slot = "Please select the available slot";
  //     isValid = false;
  //   }

  //   console.log("this data is passing", form);
  //   setFormError(errors);
  //   return isValid;
  // };

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    // if (validate()) {
    // const obj = {
    //   doctorId: doctorID,
    //   date_of_birth: form.date_of_birth,
    //   first_Name: form.first_name,
    //   last_Name: form.last_name,
    //   address: {
    //     street: form.street,
    //     city: form.city,
    //     state: form.state,
    //     country: form.country,
    //     zip: form.zip,
    //   },
    //   phone_no: form.phone_no,
    //   alternate_phone_no: form.alternate_phone_no,
    //   email: form.email,
    //   emergency_contact: {
    //     name: form.emergencyname,
    //     phone: form.emergencyphone,
    //     relationship: form.emergencyrelationship,
    //   },

    //   gender: form.gender,
    //   appointments: {
    //     date: form.appointment_date,
    //     doctor: form.appointed_doctor,
    //   },
    //   appointment_no: form.appointment_no,

    //   week_days_with_time: form.week_days_with_time,
    //   weekday: form.weekday,
    //   appointment_time: form.appointment_time,
    //   disease_name: form.disease_name,
    // };

    const obj = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone_no: form.phone_no,
      date_of_birth: form.date_of_birth,
      alternate_phone_no: form.alternate_phone_no,
      email: form.email,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      gender: form.gender,
      appointment_date: form.appointment_date,
      // appointment_type: form.appointment_type,
      // appointment_status:,
      // week_days_with_time,
      appointment_no: form.appointment_no,
      weekday: form.weekday,
      appointment_time: form.selected_slot,
      disease_name: form.disease_name,
      emergency_contact: {
        name: form.emergencyname,
        phone: form.emergencyphone,
        relationship: form.emergencyrelationship,
      },
      doctorId: doctorID,
    };

    // const obj = {
    //   doctorId: doctorID,
    //   date_of_birth: form.date_of_birth,
    //   first_name: form.first_name,
    //   last_name: form.last_name,
    //   address: {
    //     street: form.street,
    //     city: form.city,
    //     state: form.state,
    //     country: form.country,
    //     zip: form.zip,
    //   },
    //   phone_no: form.phone_no,
    //   alternate_phone_no: form.alternate_phone_no,
    //   email: form.email,
    //   emergency_contact: {
    //     name: form.emergencyname,
    //     phone: form.emergencyphone,
    //     relationship: form.emergencyrelationship,
    //   },
    //   gender: form.gender,
    //   status: form.status,
    //   referral: form.referral,
    //   // appointments: {
    //   //   date: form.appointment_date,
    //   //   doctor: form.appointed_doctor,
    //   // },

    //   appointment_date: form.appointment_date,
    //   appointment_no: form.appointment_no,
    //   selected_slot: form.selected_slot,
    //   weekday: form.weekday,
    //   appointment_time: form.appointment_time,
    //   disease_name: form.disease_name,
    // };

    console.log("this data will be send");
    console.log(obj);

    axios
      .post(`${medicalUrl}appointmentRegister`, obj)
      .then((resp) => {
        console.log(resp);

        Swal.fire({
          title: "Registration Successfully",
          icon: "success",
          confirmButtonColor: "rgb(41, 75, 147)",
          showConfirmButton: true,
        });

        todayappointmentrefresh();
        getappointmentapi();

        {
          location.pathname ==
          "/admin/Confirmed_Appointments/Patient_Registration"
            ? navigate("/admin/Confirmed_Appointments")
            : navigate("/admin/Appointment_List");
        }
      })
      .catch((error) => {
        console.error("Error patient registration:", error);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  // const handlechange = (e) => {
  //   const { name, value } = e.target;

  //   if (name == "appointment_date") {
  //     const selectedDate = new Date(value);
  //     const weekdayNames = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];

  //     const weekday = weekdayNames[selectedDate.getDay()];

  //     setForm((prevForm) => ({
  //       ...prevForm,
  //       appointment_date: value,
  //       weekday: weekday,
  //     }));
  //     validateField(name, value);
  //   } else {
  //     setForm(() => ({ ...form, [name]: value }));
  //     validateField(name, value);
  //   }
  // };

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
      // validateField(name, value);
    } else {
      setForm((prevForm) => ({
        ...prevForm, // Spread previous state to keep other form fields
        [name]: value, // Update only the field that changed
      }));
      // validateField(name, value);
    }
  };

  // Function to generate time slots
  const generateTimeSlots = (startTime, endTime, slotDuration = 30) => {
    let slots = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    let end = new Date(`1970-01-01T${endTime}:00`);

    // Loop to generate slots at intervals
    while (start < end) {
      let nextSlot = new Date(start.getTime() + slotDuration * 60000); // Adds 30 mins
      let formattedStart = start.toTimeString().substring(0, 5); // HH:MM format
      let formattedEnd = nextSlot.toTimeString().substring(0, 5);

      slots.push(`${formattedStart} - ${formattedEnd}`);

      // Move to the next slot
      start = nextSlot;
    }

    return slots;
  };

  useEffect(() => {
    if (
      form.appointed_doctor &&
      doctorlist &&
      form.appointment_date &&
      doctoravailability
    ) {
      const selectedDoctor = form.appointed_doctor;
      const selectedDate = new Date(form.appointment_date); // Appointment date
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
      console.log("Selected Day:", selectedDay); // Check the day

      // Find the availability for the selected doctor on the selected day
      const doctorAvailability = doctoravailability.find(
        (avail) =>
          avail.doctorId ===
          doctorlist.find((doctor) => doctor.name === selectedDoctor)._id
      );

      console.log("Doctor Availability:", doctorAvailability); // Check doctor availability

      if (doctorAvailability) {
        // Check if the doctor is available on the selected day
        const availableDay = doctorAvailability.availableDays.find(
          (day) => day.day === selectedDay
        );

        console.log("Available Day:", availableDay); // Check if the doctor is available on the selected day

        if (availableDay) {
          // Generate time slots based on the start and end time
          const timeSlots = availableDay.timeSlots
            .map((slot) => {
              console.log("Start Time:", slot.startTime); // Check start time
              console.log("End Time:", slot.endTime); // Check end time
              return generateTimeSlots(slot.startTime, slot.endTime);
            })
            .flat(); // Flatten the array of time slots

          console.log("Generated Time Slots:", timeSlots); // Check the generated slots

          // Update the available slots in the state
          setAvailableSlots({ timeSlots });
        } else {
          // No availability on the selected day
          setAvailableSlots({ timeSlots: [] });
          console.log("No availability for the selected day.");
        }
      } else {
        console.log("No availability found for the selected doctor.");
      }
    }
  }, [
    form.appointed_doctor,
    doctorlist,
    doctoravailability,
    form.appointment_date,
  ]);

  const selectedDoct = (e) => {
    const { name, value } = e.target;

    setForm(() => ({
      ...form,
      appointed_doctor: value,
    }));
  };

  // useEffect(() => {
  //   if (form.appointed_doctor && form.appointment_date && doctorlist) {
  //     const doctorId = doctorlist.find(
  //       (doctor) => doctor.name === form.appointed_doctor
  //     )._id;

  //     const appointmentDate = new Date(form.appointment_date).toISOString();

  //     console.log(doctorId, "this is doctor id");
  //     console.log(appointmentDate, "this is form.appointment date");

  //     axios
  //       .get(`${medicalUrl}slots/${doctorId}/${appointmentDate}`)
  //       .then((resp) => {
  //         let data = resp.data;

  //         const options = data.map((item) => {
  //           // Convert startTime and endTime to short format (e.g., 10:00 AM - 10:30 AM)
  //           const startTime = new Date(item.startTime).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           });
  //           const endTime = new Date(item.endTime).toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           });

  //           return `${startTime} - ${endTime}`;
  //         });

  //         setOptions(options);
  //       })
  //       .catch((error) => {
  //         Swal.fire({
  //           title: error.response.data.message,
  //           icon: "error",
  //           showConfirmButton: true,
  //         });
  //       });
  //   }
  // }, [form.appointment_date, form.appointed_doctor, doctorlist]);

  // const validateField = (name, value) => {
  //   let isValid = true;
  //   let errors = { ...formError };
  //   switch (name) {
  //     case "status":
  //       if (!value) {
  //         errors.status = "Please select the status";
  //         isValid = false;
  //       } else {
  //         errors.status = "";
  //       }
  //       break;

  //     case "referral":
  //       if (!value) {
  //         errors.referral = "Please enter the referral details";
  //         isValid = false;
  //       } else {
  //         errors.referral = "";
  //       }

  //       break;

  //     case "appointed_doctor":
  //       if (!value) {
  //         errors.appointed_doctor = "Please select the doctor name";
  //         isValid = false;
  //       } else {
  //         errors.appointed_doctor = "";
  //       }

  //       break;

  //     case "selected_slot":
  //       if (!value) {
  //         errors.selected_slot = "Please select the available slot";
  //         isValid = false;
  //       } else {
  //         errors.selected_slot = "";
  //       }

  //       break;

  //     case "first_name":
  //       if (!value) {
  //         errors.first_name = "Please enter first name";
  //         isValid = false;
  //       } else {
  //         errors.first_name = "";
  //       }
  //       break;

  //     case "last_name":
  //       if (!value) {
  //         errors.last_name = "Please enter last name";
  //         isValid = false;
  //       } else {
  //         errors.last_name = "";
  //       }
  //       break;

  //     case "phone_no":
  //       if (!value) {
  //         errors.phone_no = "Please enter phone number";
  //         isValid = false;
  //       } else if (value.toString().length != 10) {
  //         errors.phone_no = "Phone number must be 10 digits";
  //         isValid = false;
  //       } else {
  //         errors.phone_no = "";
  //       }
  //       break;

  //     case "alternate_phone_no":
  //       if (!value) {
  //         errors.alternate_phone_no = "Please enter alternate phone number";
  //         isValid = false;
  //       } else if (value.toString().length != 10) {
  //         errors.alternate_phone_no = "Phone number must be 10 digits";
  //         isValid = false;
  //       } else if (value == form.phone_no) {
  //         errors.alternate_phone_no = "Aleternate phone number can not be same";
  //         isValid = false;
  //       } else {
  //         errors.alternate_phone_no = "";
  //       }
  //       break;

  //     case "email":
  //       if (!value) {
  //         errors.email = "Please enter email id";
  //         isValid = false;
  //       } else if (!/\S+@\S+\.\S+/.test(value)) {
  //         errors.email = "Please enter a valid email address";
  //         isValid = false;
  //       } else {
  //         errors.email = "";
  //       }
  //       break;

  //     case "date_of_birth":
  //       if (!value) {
  //         errors.date_of_birth = "Please enter date of birth";
  //         isValid = false;
  //       } else {
  //         errors.date_of_birth = "";
  //       }
  //       break;

  //     case "gender":
  //       if (!value) {
  //         errors.gender = "Please select gender";
  //         isValid = false;
  //       } else {
  //         errors.gender = "";
  //       }
  //       break;

  //     case "street":
  //       if (!value) {
  //         errors.street = "Please enter street name";
  //         isValid = false;
  //       } else {
  //         errors.street = "";
  //       }
  //       break;

  //     case "city":
  //       if (!value) {
  //         errors.city = "Please enter city name";
  //         isValid = false;
  //       } else {
  //         errors.city = "";
  //       }
  //       break;

  //     case "state":
  //       if (!value) {
  //         errors.state = "Please enter state name";
  //         isValid = false;
  //       } else {
  //         errors.state = "";
  //       }
  //       break;

  //     case "zip":
  //       if (!value) {
  //         errors.zip = "Please enter zip code";
  //         isValid = false;
  //       } else if (value.toString().length != 6) {
  //         errors.zip = "Zip code must be 6 digits";
  //         isValid = false;
  //       } else {
  //         errors.zip = "";
  //       }
  //       break;

  //     case "country":
  //       if (!value) {
  //         errors.country = "Please enter country name";
  //         isValid = false;
  //       } else {
  //         errors.country = "";
  //       }
  //       break;

  //     case "emergencyname":
  //       if (!value) {
  //         errors.emergencyname = "Please enter emergency contact name";
  //         isValid = false;
  //       } else {
  //         errors.emergencyname = "";
  //       }
  //       break;

  //     case "emergencyrelationship":
  //       if (!value) {
  //         errors.emergencyrelationship =
  //           "Please enter emergency contact relationship";
  //         isValid = false;
  //       } else {
  //         errors.emergencyrelationship = "";
  //       }
  //       break;

  //     case "emergencyphone":
  //       if (!value) {
  //         errors.emergencyphone = "Please enter emergency contact number";
  //         isValid = false;
  //       } else if (value.toString().length != 10) {
  //         errors.emergencyphone = "Please enter 10 digit number";
  //         isValid = false;
  //       } else if (value == form.phone_no || value == form.alternate_phone_no) {
  //         errors.emergencyphone = "Please provide different number";
  //         isValid = false;
  //       } else {
  //         errors.emergencyphone = "";
  //       }
  //       break;

  //     case "disease_name":
  //       if (!value) {
  //         errors.disease_name = "Please enter disease name";
  //         isValid = false;
  //       } else {
  //         errors.disease_name = "";
  //       }
  //       break;

  //     case "appointment_time":
  //       if (!value) {
  //         errors.appointment_time = "Please enter appointment time";
  //         isValid = false;
  //       } else {
  //         errors.appointment_time = "";
  //       }
  //       break;

  //     case "appointment_date":
  //       if (!value) {
  //         errors.appointment_date = "Please enter appointment date";
  //         isValid = false;
  //       } else {
  //         errors.appointment_date = "";
  //       }

  //       break;

  //     default:
  //       break;
  //   }

  //   setFormError(errors);
  // };

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
              <h5 className="addpatient">Risk Assessment Form</h5>
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
                  {/* <h5 className="emergencycontactdetails">Personal Details</h5> */}
                  {/*
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
                  </div> */}
                  {/*
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
                  </div> */}

                  {/* <div className="col-lg-4 inputdivs">
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
                      name="selected_slot"
                    >
                      <option value="" disabled>
                        Available Slots
                      </option>
                      {availableSlots.timeSlots &&
                      availableSlots.timeSlots.length > 0 ? (
                        availableSlots.timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
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

                  {/* <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputdiseasename" className="form-label">
                      Disease Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputdiseasename"
                      name="disease_name"
                      placeholder="Enter Diesease Name"
                      value={form.disease_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">
                      {formError.disease_name}
                    </span>
                  </div> */}
                  <h5>Personal Details</h5>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Full Name"
                      name="full_name"
                      value={form.first_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.first_name}</span>
                  </div>

                  <div className="col-lg-4 inputdivs">
                    <label htmlFor="inputName" className="form-label">
                      Student ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Enter Student ID"
                      name="first_name"
                      value={form.first_name || ""}
                      onChange={handlechange}
                    />
                    <span className="bookingerror">{formError.first_name}</span>
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
                    />
                    <span className="bookingerror">
                      {formError.date_of_birth}
                    </span>
                  </div>

                  {/* <div className="col-lg-4 inputdivs">
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
                  </div> */}

                  {/* <div className="col-md-4 col-lg-4 inputdivs">
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
                  </div> */}

                  {/* <div className="col-md-4 col-lg-4 inputdivs">
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
                  </div> */}

                  <div className="col-md-6 col-lg-4 inputdivs">
                    <label htmlFor="inputEmail" className="form-label">
                      Email Address
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

                  {/* <div className="col-md-12 col-lg-4 inputdivs">
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
                  </div> */}

                  {/* <h5 className="addressdetails">Address Details</h5>

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
                  </div> */}

                  <h5 className="emergencycontactdetails">
                    Emergency Contact Details
                  </h5>

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactname"
                      className="form-label"
                    >
                      Name
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
                  <div className="col-md-4 col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactphone"
                      className="form-label"
                    >
                      Phone Number
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

                  <div className="col-lg-4 inputdivs">
                    <label
                      htmlFor="inputemergencycontactrelationship"
                      className="form-label"
                    >
                      Relation
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
                      Phone Number
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

                  <h5
                    className="emergencycontactdetails"
                    style={{ marginBottom: "15px" }}
                  >
                    <b>
                      <ul style={{ listStyleType: "square" }}>
                        <li>
                          Please answer the following questions with honesty and
                          openness to assess the risk of self-harm, suicide, or
                          harm to others.
                        </li>
                      </ul>
                    </b>
                  </h5>

                  <div>
                    <ol>
                      <li>
                        Are you currently experiencing emotional distress or
                        depression?{" "}
                        <p style={{ display: "flex" }}>
                          <div className="col-md-12 col-lg-4 inputdivs">
                            <label htmlFor="inputDate" className="form-label">
                              Yes
                            </label>
                            <input
                              type="checkbox"
                              className="form-control"
                              name="appointment_date"
                              id="inputDate"
                              placeholder="Appointment Date"
                              value={time}
                              style={{ width: "15px" }}
                              // Remove disabled attribute if not needed
                              onChange={abc}
                            />
                          </div>

                          <div className="col-md-12 col-lg-4 inputdivs">
                            <label htmlFor="inputDate" className="form-label">
                              No
                            </label>
                            <input
                              type="checkbox"
                              className="form-control"
                              name="appointment_date"
                              id="inputDate"
                              placeholder="Appointment Date"
                              value={time}
                              // Remove disabled attribute if not needed
                              onChange={abc}
                            />
                          </div>
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button type="submit" style={{ color: "black" }}>
                        Submit Details <i className="fa fa-arrow-right" />
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
