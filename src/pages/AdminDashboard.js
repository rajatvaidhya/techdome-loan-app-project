import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin") === "true") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          "https://loan-app-backend-ivi0.onrender.com/api/loan/getAllLoans",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        const data = await response.json();
        setLoans(data.loans);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2>Loan Requests</h2>

      {loading ? (
        <Loader color="black" />
      ) : (
        <div>
          {loans.length === 0 ? (
            "No loan request."
          ) : (
            <div className="loan-requests-grid">
              {loans.map((loan, index) => (
                <RequestCard
                  key={index}
                  id={loan._id}
                  name={loan.userId.name}
                  email={loan.userId.email}
                  amount={loan.amount}
                  term={loan.term}
                  state={loan.state}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
