import React, { useEffect, useState } from "react";
import "../css/CreateLoan.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateLoan = () => {
  const [amount, setAmount] = useState("");
  const [terms, setTerms] = useState("");
  const [scheduledPayments, setScheduledPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin") === "true") {
        navigate("/dashboard/admin");
      }
    } else {
      navigate("/login/user");
    }
  }, []);

  const handleScheduleLoan = () => {
    if (!amount || !terms) {
      toast.error("Please enter amount and terms", {
        theme:'dark'
      });
      return;
    }

    const weeklyInstallment = amount / terms;
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 7);

    const newScheduledPayments = [];
    for (let i = 0; i < terms; i++) {
      const scheduledDate = new Date(initialDate);
      scheduledDate.setDate(initialDate.getDate() + i * 7);
      const formattedDate = scheduledDate.toLocaleDateString("en-IN");
      newScheduledPayments.push({
        date: formattedDate,
        amount: weeklyInstallment.toFixed(2),
      });
    }

    setScheduledPayments(newScheduledPayments);
  };

  const handleApplyLoan = async () => {
    setLoading(true);

    if (!amount || !terms) {
      toast.error("Please enter amount and terms", {
        theme:'dark'
      });

      setLoading(false);
      return;
    }

    try {
      const authtoken = localStorage.getItem("authtoken");

      const response = await fetch(
        "https://loan-app-backend-ivi0.onrender.com/api/loan/createloan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authtoken,
            amount,
            term: terms,
            payments: scheduledPayments,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard/user");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="create-loan-container">
      <ToastContainer/>
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Create a Loan!</h2>

      <div className="create-loan-wrapper">
        <div className="loan-inputs">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter terms"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
          <button onClick={handleScheduleLoan}>Schedule</button>
          <button onClick={handleApplyLoan}>
            {loading ? <Loader /> : "Apply"}
          </button>
        </div>

        <div className="scheduled-loans">
          <h2 style={{marginBottom:'1rem'}}>Scheduled Loans</h2>
          {scheduledPayments.map((scheduledWeek, index) => (
            <div key={index}>
              <p>
                Week {index + 1} : {scheduledWeek.date} : {scheduledWeek.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateLoan;
