import { Button } from "@material-ui/core";

import "./landing.css";

import Link from "@material-ui/core/Link";
import logo from "../images/logo.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { auth } from "../firebase/config";
import CustomAlert from "../components/CustomAlert";

import MyBackdrop from "../components/Backdrop";

const LandingPage = () => {
  const [mode, setMode] = useState("register");
  const [formState, setFormState] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const history = useHistory();

  const [
    createUserWithEmailAndPassword,
    registerUser,
    registerLoading,
    registerError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] =
    useSignInWithEmailAndPassword(auth);

  //  handlers

  const onClose = () => {
    setAlert({
      open: false,
      type: "",
      message: "",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    // register
    if (mode === "register") {
      await createUserWithEmailAndPassword(formState.email, formState.password);

      if (registerError) {
        setAlert({
          open: true,
          type: "error",
          message: registerError,
        });
      }

      registerUser && history.push("/home");
    }

    // login
    if (mode === "login") {
      await signInWithEmailAndPassword(formState.email, formState.password);
      loginUser && history.push("/home");
      if (loginError) {
        setAlert({
          open: true,
          type: "error",
          message: loginError,
        });
      }
    }

    // reset password
    if (mode === "reset") {
      try {
        await auth.sendPasswordResetEmail(formState.email);
        setAlert({
          open: true,
          type: "success",
          message: "Please check your email for a password reset link.",
        });
      } catch (error) {
        setAlert({
          open: true,
          type: "error",
          message: error,
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="cardTitle">
          <div>
            <img src={logo} alt="notes logo" />
          </div>
          <h2 style={{ color: "#737373" }}>Notes</h2>
        </div>
        <h2 className="cardText">
          {mode === "login"
            ? "Login to your account"
            : mode === "register"
            ? "Create account"
            : "Reset password"}
        </h2>
        <div className="form-inner">
          <form className="login" onSubmit={onSubmit}>
            {mode === "register" && (
              <div className="nameField">
                <div className="field">
                  <input
                    required
                    type="text"
                    value={formState.fName}
                    placeholder="Firstname"
                    id="firstName"
                    name="fName"
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <input
                    value={formState.lName}
                    required
                    type="text"
                    id="lastName"
                    placeholder="Lastname"
                    name="lName"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="field">
              <input
                required
                placeholder="Email"
                type="email"
                value={formState.email}
                autoComplete="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            {mode !== "reset" && (
              <div className="field">
                <input
                  required
                  type="password"
                  value={formState.password}
                  placeholder="Password"
                  minLength="8"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            )}
            <p style={{ marginTop: "20px" }}>
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setMode(mode === "login" ? "register" : "login");
                }}
              >
                {mode === "login" ? "Create account" : "Log-in to your account"}
              </Link>
            </p>

            {mode === "login" && (
              <p>
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("reset");
                  }}
                >
                  Forgot password?
                </Link>
              </p>
            )}
            <div className="submitButton">
              <Button type="submit" variant="contained" color="primary">
                {mode === "login"
                  ? "Login"
                  : mode === "register"
                  ? "Create"
                  : "Reset"}
              </Button>
            </div>
          </form>
          <CustomAlert onClose={onClose} {...alert} />
          {loginLoading || (registerLoading && <MyBackdrop />)}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
