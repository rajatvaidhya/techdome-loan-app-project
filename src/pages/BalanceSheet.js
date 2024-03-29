import React, { useEffect, useState } from "react";
import "../css/BalanceSheet.css";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const BalanceSheet = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { loanId } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalIsOpen && !event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalIsOpen]);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      if (localStorage.getItem("isAdmin") === "true") {
        navigate("/dashboard/admin");
      }
    } else {
      navigate("/login/user");
    }

    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `https://loan-app-backend-ivi0.onrender.com/api/loan/getPaymentsById/${loanId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await response.json();
        setPayments(data.payments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayments();
  }, []);

  const handleRepayAmount = async () => {
    setLoading(true);
    const response = await fetch("https://loan-app-backend-ivi0.onrender.com/api/loan/doPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loanId, amount }),
    });

    const data = await response.json();
    if (response.ok) {
      window.location.reload();
    } else {
      console.error(data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-balance-sheet-container">
        <h2 style={{ textAlign: "center", marginTop: "4rem" }}>
          Balance Sheet
        </h2>

        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>To Pay</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.totalAmount}</td>
                <td>{payment.amount}</td>
                <td>{payment.date.slice(0, payment.date.indexOf("T"))}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="repay-button" onClick={openModal}>
          Repay Amount
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Details"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <div className="modal">
            <div className="modal-content">
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={handleRepayAmount}>
                {loading ? <Loader /> : "Repay"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BalanceSheet;
