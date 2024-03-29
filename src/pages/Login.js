import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Login.css";
import Loader from "../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { type } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin")==='true') {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://loan-app-backend-ivi0.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          isAdmin: type === "admin" ? true : false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authtoken", data.authtoken);
        localStorage.setItem("isAdmin", type === "admin" ? true : false);

        if (type === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      } else {
        setLoading(false);
        toast.error("Invalid id or password",{
          theme:'dark'
        } )
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer/>
      <form action="/" method="POST" onSubmit={handleLogin}>
        <h2>Welcome back!</h2>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loading ? <Loader /> : "Login"}</button>
        <p
          className="redirect-text"
          onClick={() => {
            navigate(`/signup/${type}`);
          }}
        >
          Don't have an account?
        </p>
      </form>
    </div>
  );
};

export default Login;
