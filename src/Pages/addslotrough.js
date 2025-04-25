import axios from "axios";
import React, { useContext, useState } from "react";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AppContext } from "../context";

export const Add_Slot = () => {
  const { getalldoctoravailability, doctoravailability } =
    useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  console.log(id);
  const [checkForm, setCheckForm] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const [slots, setSlots] = useState({
    sunday: [{ startTime: "", endTime: "" }],
    monday: [{ startTime: "", endTime: "" }],
    tuesday: [{ startTime: "", endTime: "" }],
    wednesday: [{ startTime: "", endTime: "" }],
    thursday: [{ startTime: "", endTime: "" }],
    friday: [{ startTime: "", endTime: "" }],
    saturday: [{ startTime: "", endTime: "" }],
  });

  // Assuming you have your API URL, ID, and availableDays data
  const handleBookingAppointment = (e) => {
    e.preventDefault();

    try {
      // Constructing the availableDays object based on form inputs
      const availableDays = Object.keys(slots)
        .filter((day) => checkForm[day]) // Only include checked days
        .map((day) => ({
          day: day.charAt(0).toUpperCase() + day.slice(1), // Capitalize day
          timeSlots: slots[day].map((slot) => ({
            startTime: `${slot.startTime}`, // Format start time
            endTime: `${slot.endTime}`, // Format end time
          })),
        }));

      const dataToSend = {
        availableDays: availableDays,
      };

      // POST request using Axios to send the availableDays to the API
      // const response = await axios.post(
      //   "http://192.168.1.38:6600/api/availability/66e96286f7414691bebf3269",
      //   dataToSend
      // );

      axios
        .post(`${medicalUrl}availability/${id}`, dataToSend)
        .then((resp) => {
          Swal.fire({
            title: "Add Successfully",
            icon: "success",
            confirmButtonColor: "rgb(196,222,167)",
            showConfirmButton: true,
          });

          navigate("/admin/Doctors_List");
          getalldoctoravailability();
        })
        .catch((error) => {});

      // Log success response
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error sending data to the API:", error);
    }
  };

  const checkbox = (e) => {
    const { name, checked } = e.target;
    setCheckForm((prevForm) => ({
      ...prevForm,
      [name]: checked,
    }));
  };

  const handleSlotChange = (e, day, index, type) => {
    const { value } = e.target;
    const updatedSlots = [...slots[day]];
    updatedSlots[index][type] = value;
    setSlots({ ...slots, [day]: updatedSlots });
  };

  const addSlot = (day) => {
    setSlots({
      ...slots,
      [day]: [...slots[day], { startTime: "", endTime: "" }],
    });
  };

  const removeSlot = (day, index) => {
    const updatedSlots = slots[day].filter((_, i) => i !== index);
    setSlots({ ...slots, [day]: updatedSlots });
  };

  const renderSlotsForDay = (day) => {
    return slots[day].map((slot, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          columnGap: "10px",
          marginBottom: "10px",
          width: "61vw",
        }}
      >
        <div className="col-lg-5 inputdivs">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            value={slot.startTime}
            onChange={(e) => handleSlotChange(e, day, index, "startTime")}
          />
        </div>
        <div className="col-lg-5 inputdivs">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            value={slot.endTime}
            onChange={(e) => handleSlotChange(e, day, index, "endTime")}
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-danger"
            style={{ width: "85px", marginTop: "30px" }}
            onClick={() => removeSlot(day, index)}
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Add Schedule</h5>
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
                  {[
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                  ].map((day) => (
                    <div
                      className="schedulediv"
                      key={day}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <label htmlFor={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                      <input
                        type="checkbox"
                        id={day}
                        name={day}
                        onChange={checkbox}
                        checked={checkForm[day]}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {checkForm[day] && renderSlotsForDay(day)}
                      </div>
                      {checkForm[day] && (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: "-20px" }}
                            onClick={() => addSlot(day)}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </>
                      )}
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{
                        color: "black",
                        backgroundColor: "rgb(196,222,167)",
                        display: "flex",
                        margin: "auto",
                      }}
                    >
                      Add Schedule
                    </button>
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
