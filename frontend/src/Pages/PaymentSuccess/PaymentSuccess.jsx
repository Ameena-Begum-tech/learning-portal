import React from "react";
import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <FaCheckCircle className="success-icon" />
          <h2>Payment Successful!</h2>
          <p>Your course subscription has been activated.</p>
          <p className="reference">
            Reference No: <span>{params.id}</span>
          </p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
