import { Button } from "@mui/material";
import { updatePassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// import "./changePassword.css";

const ForgotPassword = () => {
  const [validation, setValidation] = useState(false);
  //   const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [security_question, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { state } = useLocation();
  const { user_email } = state;
  //   console.log(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length === 0 || newPassword !== answer) {
      setValidation(true);
    }
    if (confirmPassword === answer) {
      sendPasswordResetEmail(auth, user_email)
        .then(() => {
          alert("Password reset email sent!");
          navigate('/login')
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", user_email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSecurityQuestion(doc.data().security_question);
        setAnswer(doc.data().answer);
        console.log(answer);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="change-password-main">
      <form className="change-password-container">
        <p>{security_question}</p>
        <input
          type="text"
          placeholder="Answer"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {/* {validation && confirmPassword.length === 0 ? (
          <label style={{ color: "red" }}>Invalid answer!</label>
        ) : (
          ""
        )} */}
        {validation && confirmPassword !== answer ? (
          <label style={{ color: "red" }}>Invalid answer!</label>
        ) : (
          ""
        )}

        <Button variant="outlined" size="small" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
