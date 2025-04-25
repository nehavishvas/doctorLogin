import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { medicalImageUrl, medicalUrl } from "../../BaseUrl/BaseUrl";
import { AppContext } from "../../context";

const defaultState = {
  firstName: "",
  email: "",
  image: "",
};
export default function MyProfile() {
  const { MyProfile, Id, MYPROFILE } = useContext(AppContext);

  const id = localStorage.getItem("id");
  console.log(id);
  const navigate = useNavigate();

  const [state, setState] = useState(defaultState);
  const [selectedImage, setSelectedImage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const [ID, setID] = useState("");

  const [fullnameerror, setFullNameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [imageerror, setImageError] = useState("");

  useEffect(() => {
    if (MyProfile) {
      setFullName(MyProfile.name);
      setEmail(MyProfile.email);
      setImage(MyProfile.profileImage);
    }

    if (Id) {
      setID(Id);
    }
  }, [MyProfile, Id]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const imageFunction = (event) => {
    setSelectedImage(event.target.files[0]);
    setState({ ...state, image: event.target.files[0].name });
    setImage(event.target.files[0].name);
  };

  const validate = () => {
    let isValid = true;

    if (!fullName) {
      setFullNameError("Please enter the name");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!email) {
      setEmailError("Please enter the email");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };
  const submitFormData = () => {
    if (validate()) {
      const bodyFormData = new FormData();

      if (selectedImage) {
        const file = new File([selectedImage], image, {
          type: "image/jpeg",
        });
        bodyFormData.append("profileImage", file);
      }

      bodyFormData.append("name", fullName);

      bodyFormData.append("email", email);

      axios
        .put(`${medicalUrl}updateAdminDetail/${ID}`, bodyFormData)
        .then((resp) => {
          axios
            .get(`${medicalUrl}getAdminDetail/${ID}`)
            .then((resp) => {
              MYPROFILE(resp.data.data);

              console.log(resp);
            })
            .catch((error) => {
              Swal.fire({
                title: error.response.data.message,
                icon: "error",
              });
            });

          Swal.fire({
            title: "Profile updated successfully",
            icon: "success",
          });
          navigate("/admin", { state: { dataValue: state } });
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
          });
          console.log(error);
        });
    }
  };
  return (
    <div class=" bg-white m-0 p-0 ">
      <div class="row">
        {/* <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            {selectedImage ? (
              <img
                alt="not found"
                class="rounded-circle mt-5"
                width="150px"
                height="150px"
                src={URL.createObjectURL(selectedImage)}
              />
            ) : (
              <img
                alt="not found"
                class="rounded-circle mt-5"
                width="150px"
                src={`${medicalImageUrl}${image}`}
                // defaultState={state.image}
              />
            )}
            <div style={{ marginStart: "10px" }} class="mypofilerelative">
              <input
                style={{ margin: "5px 0px 0px 50px" }}
                className="mb-2  w-100 hidden "
                type="file"
                name="image"
                // defaultValue={state.image}
                onChange={(event) => {
                  imageFunction(event);
                }}
              />

              <span class="myprofileerror">{imageerror}</span>
            </div>
          </div>
        </div> */}
        <div class="col-md-12  border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right " style={{ color: "#000000" }}>
                {" "}
                My Profile{" "}
              </h4>
            </div>
            <div class="form-outline mb-4 mypofilerelative">
              <TextField
                fullWidth
                label="Name"
                id="fullWidth"
                autoComplete="off"
                onChange={(e) => setFullName(e.target.value)}
                name="firstName"
                value={fullName}
              />
              <span class="myprofileerror">{fullnameerror}</span>
            </div>

            <div class="form-outline mb-4 mypofilerelative">
              <TextField
                fullWidth
                label="Email"
                id="fullWidth"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
              />

              <span class="myprofileerror">{emailerror}</span>
            </div>
            <div class="mt-3 text-center">
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={submitFormData}
              >
                Update
                <ArrowRightAltIcon />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
