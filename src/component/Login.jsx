import React, { useState } from "react";
import "./Login.css";
import loginimg from "../assets/images/login3.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Confirmationmodal from "./Confirmationmodel";

export const Login = () => {
  const [mobileNumber, setMobilenumber] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileVlidation, setMobilevalidation] = useState("");
  const [roleVlidation, setRolevalidation] = useState("");
  const [otpVlidation, setOtpvalidation] = useState("");
  const navigate = useNavigate();

  const [showModel,setShowModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const showModelHandler = (event) => {
    event.preventDefault();
    setShowModel(true);
  }
  const hideModelHandler = () => {
    setShowModel(false);
  };

  const [generatedOTP, setGeneratedOTP] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );

  const handleGenerateOtp = () => {
    setOtp(generatedOTP.toString());
    alert("One Time Password:" + generatedOTP);
    console.log("Mobile:", mobileNumber);
    console.log("Role:", role);
  };

  const handleMobileNumberChange = (event) => {
    const value = event.target.value;

    if (/^[0-9]*$/.test(value)) {
      setMobilenumber(value);
      setMobilevalidation("");
      }
    };

  const selectRoleValue = (e) => {
    setRole(e.target.value);
  };

  console.log(otp, generatedOTP);

  const handleOtpChange = (event) => {
    console.log(event.target.value);
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModel(true);

    if (!mobileNumber) {
      setMobilevalidation("Mobile Number is required");
    }
    if (!role) {
      setRolevalidation("Role is required");
    }

    if (!otp) {
      setOtpvalidation("OTP is reruired");
    }
    if (generatedOTP != otp) {
      setOtpvalidation("OTP is invalid");
      toast.error("Yout OTP Is Invalid");
      return;
    }
    if (!mobileNumber || !role || !otp) {
      toast.error("Login error");
      toast.warning("Login worning");
      return;
    }
    const formData = {
      mobileNumber,
      role,
      otp,
    };

    try{
      const res = await fetch(
        "https://696b4b79624d7ddccaa0bd60.mockapi.io/user"
      );
      const users = await res.json();
      //find existing user
      const existingUser = users?.find(
        (user) =>
          user.mobileNumber == mobileNumber &&
          user.role == role
      );
      if (existingUser) {
        const userExistingData = existingUser;
        toast.success("Login successfully ");
        setTimeout(() => {
          localStorage.setItem("loginData",JSON.stringify(userExistingData));
          navigate("/");
        },2000);
      } else {

      setLoading(true);
      const url = 'https://696b4b79624d7ddccaa0bd60.mockapi.io/user';
      const method = "POST";
      const response = await fetch(url,{
        method,
        headers: {
          "content-Type" : "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response,"res");
      if(!response.ok){
        toast.error("Invalid Request");
      }
      const data = await response.json();
      console.log("Form sunmitted:", data);
      toast.success("Login successfully");
      setTimeout(() => {
        localStorage.setItem(
          "loginData",
          JSON.stringify({
            id: data.id,               // ⭐⭐⭐ MOST IMPORTANT
            mobile: data.mobile,
            role: data.role,
            otp: data.otp,
          })
        );
        navigate("/");
      }, 1000); 
      }
    } catch {
        toast.error("Error");
    }

    /* localStorage.setItem("loginData", JSON.stringify(formData));
    setTimeout(() => {
      navigate("/");
    }, 1000); */

    console.log("Form Submitted:", formData);
    setMobilevalidation("");
    setRolevalidation("");
    setOtpvalidation("");

    setMobilenumber("");
    setRole("");
    setOtp("");

    /* const loginClick = (e) => {
        e.preventDefault();
        toast.info("Login information"); */
    /* toast.success("Login success"); */
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={loginimg} alt="Login Illustration" />
      </div>
      <div className="login-right">
        <h2>🖐Hello Again,</h2>
        <p className="subtitle">Welcome back,let's get started!</p>

        <form onSubmit={showModelHandler}>
          <input
            type="text"
            placeholder="Mobile Number"
            className="input-field"
            minLength={10}
            maxLength={10}
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />

          {mobileVlidation ? <p className="error">{mobileVlidation}</p> : <></>}

          <select
            className="input-field"
            value={role}
            onChange={selectRoleValue}
          >
            <option value="">Select a Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {roleVlidation ? <p className="error">{roleVlidation}</p> : <></>}

          <button
            className="btn primary"
            type="button"
            onClick={handleGenerateOtp}
          >
            Generate OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            className="input-field"
            maxLength={4}
            value={otp}
            onChange={handleOtpChange}
          />

          {otpVlidation ? <p className="error">{otpVlidation}</p> : <></>}

          <button className="btn secondary" /*  onClick={loginClick} */>
            Login
          </button>
          <ToastContainer />
        </form>
      </div>
      {showModel && (
        <Confirmationmodal
          title="Login?"
          desc="Are you sure,about login?"
          onClose={hideModelHandler}
          onConfirm={handleSubmit}
          confirmBtnText="Login"
        />
      )}
    </div>
  );
};
export default Login;
