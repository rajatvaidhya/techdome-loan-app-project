import React, { useEffect, useState } from "react";
import UserLoanCard from "../components/UserLoanCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin") === "true") {
        navigate("/dashboard/admin");
      }
    } else {
      navigate("/login/user");
    }

    const fetchLoans = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://loan-app-backend-ivi0.onrender.com/api/loan/getLoansById",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authtoken: localStorage.getItem("authtoken"),
            }),
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
      <h2>Your Loans</h2>

      {loading ? (
        <Loader color="black" />
      ) : (
        <div>
          {loans.length === 0 ? (
            "No loans taken."
          ) : (
            <div className="loan-requests-grid">
              {loans.map((loan, index) => (
                <UserLoanCard
                  key={index}
                  loanId={loan._id}
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

export default MyLoans;
