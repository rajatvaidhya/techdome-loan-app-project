import React from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-home-container">
        <h1>Welcome to Loanplus+ 💰</h1>
        <h2>
          <Typewriter
            options={{
              strings: [
                "Your Ultimate Loan Management Solution!",
                "Apply for loans with ease and track your application progress in real-time.",
                "Efficiently manage loan approvals and repayments with our intuitive platform.",
                "Join thousands of satisfied users who trust LoanPro for their financial needs.",
              ],
              autoStart: true,
              loop: false,
              typingSpeed: 900,
            }}
          />
        </h2>
        <p>
          We understand the importance of financial flexibility and support.
          Whether you're an individual seeking financial assistance or an
          administrator overseeing loan approvals, we've got you covered. Our
          intuitive platform empowers users to apply for loans effortlessly,
          while administrators can efficiently manage and monitor loan
          applications
        </p>
        <button onClick={() => navigate("/login/user")}>Apply for loan</button>
      </div>

      <footer>
        <p>Developed by Rajat Vaidhya - All rights reserved &copy; 2024</p>
      </footer>
    </>
  );
};

export default Home;
