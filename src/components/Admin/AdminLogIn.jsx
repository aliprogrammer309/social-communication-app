import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

const AdminLogIn = () => {
  const [validation, setValidation] = useState(false);
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState("");

  console.log(password);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "DH@098@321") {
      setShowErr("");
      navigate("/Admin");
    } else {
      setShowErr("Invalid Password!");
    }
  };
  return (
    <div className="admin-login-main">
      <h1>Admin Log In</h1>
      <form className="admin-login-container">
        <input
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label style={{ color: "red" }}>{showErr}</label>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};
export default AdminLogIn;
