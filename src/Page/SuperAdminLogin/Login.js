import React, { useContext, useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import axios from "axios";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { medicalUrl } from "../../BaseUrl/BaseUrl";
import { AppContext } from "../../context";
import { GiConsoleController } from "react-icons/gi";
import AdminImage from "../../img/medicallogo.jpeg";
const defaultState = {
  email: "",
  password: "",
};

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [blogErr, setBlogErr] = useState(false);
  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const { ID, MYPROFILE } = useContext(AppContext);

  const loginApproved = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();

    setBlogErr({
      email: false,
      password: false,
    });
    if (!state.email) {
      setBlogErr((prevState) => ({ ...prevState, email: true }));
    }
    if (!state.password) {
      setBlogErr((prevState) => ({ ...prevState, password: true }));
    }
    if (!state.email || !state.password) {
      return;
    }
    setLoading(true); // Set loading to true when the API call starts
    axios
      .post(`${medicalUrl}doctorLogin`, {
        email: state.email.toLowerCase(),
        password: state.password,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          console.log("hiii");

          const getId = response.data.data._id;
          console.log(getId);

          localStorage.setItem("id", getId);
          ID(getId);
          MYPROFILE(response.data.data);
          console.log(response.data.data);

          Swal.fire({
            title: "Login Successfully",
            icon: "success",
          });
          navigate("/admin");
          setBlogErr(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: error.response?.data.message,
          icon: "error",
        });
        setError({
          errors: error,
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgotPassword = () => {
    navigate("/Forgot");
  };

  return (
    <>
      <div>
        <div className="wrapper">
          <div className="container-style">
            <div className="col-left">
              <div className="login-text">
                <h2>
                  <img
                    src={AdminImage}
                    className="festabash-l0go mb-3"
                    alt=""
                  />
                </h2>
                <p>
                  {/* <img
                    src="assets/img/achlogo.png"
                    className="festabash-l0go mb-3"
                    style={{ width: "100px" }}
                    alt=""
                  /> */}
                </p>
              </div>
            </div>
            <div className="col-right">
              <div className="login-form">
                <h2>Doctor Login</h2>

                <p>
                  <TextField
                    fullWidth
                    className="mb-1 mt-3 w-100 "
                    label="Email"
                    name="email"
                    type="text"
                    error={false}
                    autoComplete="off"
                    onChange={loginApproved}
                    value={state.email}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {blogErr && !state.email ? "*Please Enter Your email" : ""}
                  </span>
                </p>

                <p>
                  <TextField
                    fullWidth
                    classNameName="mb-1 mt-3 w-100"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={loginApproved}
                    value={state.password}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {blogErr.password && !state.password
                      ? "*Please Enter Your password"
                      : ""}
                  </span>
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors?.response?.data?.message
                      : " "}
                  </span>
                </p>
                <p>
                  <Button
                    variant="contained"
                    className="global_button"
                    onClick={submitData}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </p>

                <div className="text-center mt-3 forgotend">
                  {/* <span style={{ cursor: "pointer" }} onClick={forgotPassword}>
                    Forgot password?{" "}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="credit"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
