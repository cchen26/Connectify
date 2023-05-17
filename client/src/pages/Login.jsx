import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../services/apiService.js";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="registerLogo">
            <img src="assets/social.png" alt="logo" />
            <h3 className="registerLogo">Connectify</h3>
          </div>
          <img
            src="assets/Testimonial.png"
            alt="welcome"
            height={450}
            width={450}
          />
        </div>
        <div className="loginRight">
          <div>
            <h1 className="loginRight-heading">Log into Your Account</h1>
          </div>
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput passwordInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20" />
              ) : (
                "Log In"
              )}
            </button>
            <p className="callToRegister">
              Don't have an account ?{" "}
              <span onClick={() => navigate("/register")}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
