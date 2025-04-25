import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./forgot.css";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router";

export const Forgot = () => {
  const [forgotemail, setForgotEmail] = useState("");
  const [forgotemailerror, setForgotEmailError] = useState("");
  const navigate = useNavigate();

  function validateEmail() {
    let isValid = true;

    if (!forgotemail) {
      setForgotEmailError("Please enter your email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(forgotemail)) {
      setForgotEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setForgotEmailError("");
    }

    return isValid;
  }

  const forgot = async () => {
    if (validateEmail()) {
      let isValid = true;
      let obj = { email: forgotemail };

      axios
        .post(`${medicalUrl}generate_otp`, obj)
        .then((resp) => {})
        .catch((error) => {
          console.log("invalid email");
        });

      const { value: otp } = await Swal.fire({
        title: "Enter OTP",
        input: "text",
        inputPlaceholder: "Enter Your OTP",
        inputAttributes: {
          maxlength: 6,
          autocapitalize: "off",
          autocorrect: "off",
          inputmode: "numeric", // Ensures numeric keypad on mobile
        },
        showCancelButton: true,
        preConfirm: (otp) => {
          if (!otp) {
            Swal.showValidationMessage("Please enter the OTP.");
            return false; // Return false to keep the popup open
          } else if (!/^\d{4,6}$/.test(otp)) {
            // Ensure the OTP is a 4-digit number
            Swal.showValidationMessage("Please enter a valid OTP.");
            return false; // Return false to keep the popup open
          }

          return otp;
        },
        didOpen: () => {
          const input = Swal.getInput();
          input.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Restrict input to numbers
          });
        },
      });

      const otpObj = { otp: otp };

      axios
        .post(`${medicalUrl}verify_otp`, otpObj)
        .then(async (resp) => {
          await Swal.fire({
            title: "OTP Verified",
            text: "Your OTP is correct",
            icon: "success",
          });

          const { value: formValues } = await Swal.fire({
            title: "Enter Your New Password",
            html:
              '<input id="swal-input1" class="swal2-input" placeholder="New Password" type="text">' +
              '<input id="swal-input2" class="swal2-input" placeholder="Confirm Password" type="text">',
            focusConfirm: false,
            preConfirm: () => {
              const password = document.getElementById("swal-input1").value;
              const confirmPassword =
                document.getElementById("swal-input2").value;
              if (!password || !confirmPassword) {
                Swal.showValidationMessage(
                  "Please enter both password fields."
                );
              } else if (password !== confirmPassword) {
                Swal.showValidationMessage("Passwords do not match.");
              }
              return { password, confirmPassword };
            },
          });

          if (formValues) {
            const { password, confirmPassword } = formValues;

            let obj = {
              newPassword: password,
              confirmNewPassword: confirmPassword,
            };
            axios
              .post(`${medicalUrl}resetPassword/${resp.data.data}`, obj)
              .then((resp) => {
                Swal.fire({
                  title: "Password Updated",
                  text: "Your password has been successfully updated",
                  icon: "success",
                  showConfirmButton: true,
                });

                navigate("/");
              })
              .catch((error) => {
                Swal.fire({
                  title: error.response.data.message,
                  icon: "error",
                  text: "",
                });
              });

            setForgotEmail("");
          }
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            // text: "The OTP you entered is incorrect",
            icon: "error",
          });
        });
    }
  };

  return (
    <>
      <div className="Forgot-main">
        <div className="Forgot-main-sub-body">
          <div className="Forgot-main-sub-body-forgot-box">
            <div className="Forgot-main-sub-body-forgot-box-sub-first">
              {/* <div className="Forgot-main-sub-body-forgot-box-sub-first-sub-first">
                <img
                  className="Forgot-main-sub-body-forgot-box-sub-first-sub-first"
                  src="assets/img/achlogo.png"
                  alt="Logo"
                />
              </div> */}
              <div className="Forgot-main-sub-body-forgot-box-sub-first-sub-second">
                Forgot Password?
              </div>
            </div>
            <div className="Forgot-main-sub-body-forgot-box-sub-second">
              <div className="Forgot-main-sub-body-forgot-box-sub-second-sub-first">
                <label htmlFor="email">Email</label>
              </div>
              <div className="Forgot-main-sub-body-forgot-box-sub-second-sub-second">
                <input
                  type="email"
                  value={forgotemail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  name="email"
                  id="email"
                />
                <span className="forgoterror">{forgotemailerror}</span>
              </div>
            </div>
            <div className="Forgot-main-sub-body-forgot-box-sub-third">
              <button
                className="Forgot-main-sub-body-forgot-box-sub-third-button"
                onClick={forgot}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
