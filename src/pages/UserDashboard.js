import React, { useEffect } from "react";
import '../css/UserDashboard.css'
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('authtoken')){
      if(localStorage.getItem('isAdmin')==='true'){
        navigate("/dashboard/admin")
      } else{
        navigate("/dashboard/user")
      }
    } else {
      navigate("/");
    }
  },[])
  
  return (
    <div className="user-dashboard-container">
      <h2>Welcome Back! 👋</h2>
      <p>
        Welcome to your dashboard! Create new loans and track existing ones with
        ease. Take control of your finances, all in one place.
      </p>

      <div className="user-utility-buttons">
        <button onClick={()=>navigate("/create-loan")}>Create a loan</button>
        <button onClick={()=>navigate("/my-loans")}>View my loans</button>
      </div>
    </div>
  );
};

export default UserDashboard;
