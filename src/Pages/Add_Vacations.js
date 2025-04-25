import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AppContext } from "../context";

export const Add_Vacations = () => {
  const { getalldoctoravailability, vacationslist, getallvacationlist } =
    useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [vacationDates, setVacationDates] = useState([
    { startDate: "", endDate: "" },
  ]);

  // Prepopulate vacation data when vacationslist is available
  useEffect(() => {
    if (vacationslist && vacationslist.length > 0) {
      const doctorVacations = vacationslist
        .map((vacation) => {
          return vacation.vacationDate.map((date) => ({
            startDate: date.startDate,
            endDate: date.endDate,
          }));
        })
        .flat(); // Flatten array in case of multiple vacation entries
      setVacationDates(doctorVacations);
    }
  }, [vacationslist]);

  const handleBookingAppointment = (e) => {
    e.preventDefault();

    const dataToSend = {
      vacationDates: vacationDates,
    };

    axios
      .post(`${medicalUrl}createVacation/${id}`, dataToSend)
      .then((resp) => {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
          confirmButtonColor: "rgb(196,222,167)",
          showConfirmButton: true,
        });

        navigate("/admin/Doctors_List");
        getalldoctoravailability();
        getallvacationlist();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDateChange = (e, index, type) => {
    const { value } = e.target;
    const updatedVacationDates = [...vacationDates];
    updatedVacationDates[index][type] = value;
    setVacationDates(updatedVacationDates);
  };

  const addVacationSlot = () => {
    setVacationDates([...vacationDates, { startDate: "", endDate: "" }]);
  };

  const removeVacationSlot = (index) => {
    const updatedVacationDates = vacationDates.filter((_, i) => i !== index);
    setVacationDates(updatedVacationDates);
  };

  return (
    <>
      <section className="blogBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="addpatient">Add Vacations</h5>
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
                  {vacationDates.map((vacation, index) => (
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
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={vacation.startDate}
                          onChange={(e) =>
                            handleDateChange(e, index, "startDate")
                          }
                        />
                      </div>
                      <div className="col-lg-5 inputdivs">
                        <label className="form-label">End Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={vacation.endDate}
                          onChange={(e) =>
                            handleDateChange(e, index, "endDate")
                          }
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "85px", marginTop: "30px" }}
                          onClick={() => removeVacationSlot(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addVacationSlot}
                    >
                      Add More Vacations
                    </button>
                  </div>

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
                      Submit
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
