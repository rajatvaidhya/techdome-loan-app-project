import React, { useState } from "react";
import "../css/RequestCard.css";

const RequestCard = (props) => {
  const [state, setState] = useState(props.state);

  const handleStateChange = async (status) => {
    try {
      const response = await fetch(
        "https://loan-app-backend-ivi0.onrender.com/api/loan/updateState",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanId: props.id,
            state: status,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update loan state");
      } else {
        setState(status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="request-card-container">
      <div>
        <p>Name : {props.name}</p>
        <p>Email : {props.email}</p>
        <p>Amount : ${props.amount}</p>
        <p>Term : {props.term} weeks</p>
      </div>

      <div className="request-card-buttons">
        {state === "PENDING" && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => handleStateChange("APPROVED")}>
              Approve
            </button>
            <button onClick={() => handleStateChange("REJECTED")}>
              Reject
            </button>
          </div>
        )}

        {state === "REJECTED" && (
          <div>
            <button style={{ backgroundColor: "red" }}>Rejected</button>
          </div>
        )}

        {state === "PAID" && (
          <div>
            <button style={{ backgroundColor: "black" }}>Paid</button>
          </div>
        )}

        {state === "APPROVED" && (
          <div>
            <button style={{ backgroundColor: "green" }}>Approved</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
