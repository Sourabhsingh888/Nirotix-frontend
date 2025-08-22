import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#dc3545" }}>403</h1>
      <h2 style={{ marginBottom: "10px" }}>Unauthorized Access</h2>
      <p style={{ marginBottom: "20px", maxWidth: "500px" }}>
        You do not have permission to view this page. Please log in with the
        appropriate credentials or return to the home page.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Unauthorized;
