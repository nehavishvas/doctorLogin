import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { medicalUrl } from "../BaseUrl/BaseUrl";
import { AppContext } from "../context";

const defaultState = {
  firstName: "",
  email: "",
  image: "",
};
export default function Change_Password() {
  const id = localStorage.getItem("id");

  const { Id } = useContext(AppContext);
  // console.log(id);
  const navigate = useNavigate();
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [state, setState] = useState(defaultState);

  const [oldpassword, setOldPassword] = useState();
  const [newpassword, setNewPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();

  const [oldpassworderror, setOldPasswordError] = useState();
  const [newpassworderror, setNewPasswordError] = useState();
  const [confirmpassworderror, setConfirmPasswordError] = useState();

  const validate = () => {
    let isValid = true;
    if (!oldpassword) {
      setOldPasswordError("Please Enter the old password");
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (!newpassword) {
      setNewPasswordError("Please Enter the new password");
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!confirmpassword) {
      setConfirmPasswordError("Please Enter the confirm password");
      isValid = false;
    } else if (confirmpassword != newpassword) {
      isValid = false;
      setConfirmPasswordError("Confirm Password doesn't match.");
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const submitData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = async () => {
    if (validate()) {
      let result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        let obj = {
          oldPassword: oldpassword,
          newPassword: newpassword,
          confirmPassword: confirmpassword,
        };

        axios
          .post(`${medicalUrl}changeUserPassword/${Id}`, obj)
          .then((response) => {
            // console.log(response);
            // Swal.fire(
            //   "Password updated successfully!",
            //   "You clicked the button!"
            // );

            Swal.fire({
              title: "Password Updated",
              text: "Your password has been successfully updated",
              icon: "success",
              showConfirmButton: true,
            });

            navigate("/admin");
          })
          .catch((error) => {
            console.log(error);

            Swal.fire({
              title: "Password updation failed",
              text: "Your password not updated",
              icon: "error",
              showConfirmButton: true,
            });
            setError({
              errors: error,
              isError: true,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    }
  };
  return (
    <div class=" bg-white m-0 p-0 ">
      <div class="row">
        <div class="col-md-12 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right " style={{ color: "#000000" }}>
                {" "}
                Change Password{" "}
              </h4>
            </div>
            <div class="form-outline mb-4  changepasswordinput">
              <TextField
                fullWidth
                label="Old Password"
                id="fullWidth"
                autoComplete="off"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
                name="firstName"
                value={oldpassword}
              />

              <span class="changepassworderror">{oldpassworderror}</span>
            </div>

            <div class="form-outline mb-4 changepasswordinput">
              <TextField
                fullWidth
                label="New Password"
                id="fullWidth"
                autoComplete="off"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                name="email"
                value={newpassword}
              />

              <span class="changepassworderror">{newpassworderror}</span>
            </div>

            <div class="form-outline mb-4 changepasswordinput">
              <TextField
                fullWidth
                label="Confirm Password"
                id="fullWidth"
                autoComplete="off"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                name="email"
                value={confirmpassword}
              />
              <span class="changepassworderror">{confirmpassworderror}</span>
            </div>

            <div class="mt-3 text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitFormData}
              >
                Update
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
