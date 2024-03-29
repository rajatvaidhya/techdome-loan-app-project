import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { type } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin") === "true") {
        navigate("/dashboard/admin");
      } else navigate("/dashboard/user");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please enter all details.", {
        theme: "dark",
      });
      return;
    }

    if (password.length < 8) {
      toast.warn("Password should container minimum 8 letters.", {
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://loan-app-backend-ivi0.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            isAdmin: type === "admin" ? true : false,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authtoken", data.authtoken);
        localStorage.setItem("isAdmin", type === "admin" ? true : false);

        if (data.isAdmin === true) {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      } else {
        console.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form action="/" method="POST" onSubmit={handleSignup}>
        <h2>Create an account!</h2>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">{loading ? <Loader /> : "Signup"}</button>
        <p
          className="redirect-text"
          onClick={() => {
            navigate(`/login/${type}`);
          }}
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
};

export default Signup;
