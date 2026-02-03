import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaMoon } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import Confirmationmodal from "./Confirmationmodel";
import EditProfile from "./EditProfileModel";
import ModeContext from "../context/ModeContext";

export function Navbar() {
  const navigate = useNavigate()
  const ctx = useContext(ModeContext);
  console.log(ctx,"Context value");
  
  const loggedINUserData = JSON.parse(localStorage.getItem("loginData")) || {}
  console.log(loggedINUserData);

  const userInitial = loggedINUserData?.role?.charAt(0)?.toUpperCase() || "";
  const [showModel,setShowModel] = useState(false);
  const [showEditModel,setShowEditModel] = useState(false);

  const showModelHandler = () => {
    setShowModel(true);
  }
  const hideModelHandler = () => {
    setShowModel(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setShowModel(false)
    setTimeout(()=>{
      navigate("/login");
    },2000)
     toast.success("Logout success");
  };
  return (
    <>
    <nav className={`nav ${ctx?.mode == "dark" ? "nav-dark" : "nav-light"}`}>
      <h2>BLOGPOST</h2>
      <ul className="menu-container">

        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
        </li>
        {loggedINUserData?.role === "admin" ? 
        <li>
          <NavLink to="/new-post" className={({ isActive }) => (isActive ? "active-link" : "")}>New Post</NavLink>
        </li> : <></>}
        <li>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? "active-link" : "")}>Explore Post</NavLink>
        </li>
        <li onClick={showModelHandler}>
          Logout
        </li>
      </ul>
      {loggedINUserData.role && <p className="user-role">{loggedINUserData.role}</p>}

      <div className="mode-container">
        <FaMoon /> <span onClick={ctx?.toggleMode}>{ctx?.mode == "dark" ? "Light" : "Dark"}</span>
        <div className="circle" >
        <span onClick={() => setShowEditModel(true)}> {userInitial} </span>
        </div>
      </div>
      
    </nav>
    {showEditModel &&
      <EditProfile
        onClose={() => setShowEditModel(false)}
        userId={loggedINUserData?.id}
    />}
      <ToastContainer />
      {showModel && (
        <Confirmationmodal
          title="Logout?"
          desc="You are about to log out, are you sure?"
          onClose={hideModelHandler}
          onConfirm={handleLogout}
          confirmBtnText="Logout"
        />
      )}
    </>
  );
}
export default Navbar;
