import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://localhost:8800/api/v1/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className="registerLogo">
            <img src="assets/social.png" alt="logo" />
            <h3 className="registerLogo">Connectify</h3>
          </div>
          <img
            src="assets/Welcome.png"
            alt="welcome"
            height={500}
            width={500}
          />
        </div>
        <div className="registerRight">
          <div>
            <h1 className="registerRight-heading">Create Your Account</h1>
          </div>
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
              type="text"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <p className="callToLogin">
              Already have an account ?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
