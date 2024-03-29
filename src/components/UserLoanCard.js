import React from "react";
import { useNavigate } from "react-router-dom";

const UserLoanCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="request-card-container">
      <div>
        <p>Amount : ${props.amount}</p>
        <p>Term : {props.term} weeks</p>
      </div>

      <div className="request-card-buttons">
        {props.state === "PENDING" && (
          <button style={{ backgroundColor: "blue" }}>Pending</button>
        )}

        {props.state === "PAID" && (
          <button style={{ backgroundColor: "black" }}>Paid</button>
        )}

        {props.state === "APPROVED" && (
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => navigate(`/balance-sheet/${props.loanId}`)}
          >
            Approved
          </button>
        )}

        {props.state === "REJECTED" && (
          <button style={{ backgroundColor: "red" }}>Rejected</button>
        )}
      </div>
    </div>
  );
};

export default UserLoanCard;
