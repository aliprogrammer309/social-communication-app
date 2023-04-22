import { Button } from "@mui/material";
import { updatePassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import "./changePassword.css";

const ChangePassword = () => {
  const [validation, setValidation] = useState(false);
  //   const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPassword.length <= 5 ||
      confirmPassword <= 5 ||
      newPassword !== confirmPassword
    ) {
      setValidation(true);
    } else {
      updatePassword(user, newPassword)
        .then(() => {
          alert("Password changed sucessfuly");
          const user = auth.currentUser;
          for (let index = 0; index < patientsData.length; index++) {
            if (user.uid === patientsData[index].uid) {
              navigate("/PersonalProfile");
              break;
            }
          }
          for (let index = 0; index < communityData.length; index++) {
            if (user.uid === communityData[index].uid) {
              navigate("/CommunityProfile");
              break;
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let list1 = [];
      let list2 = [];

      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        querySnapshot.forEach((doc) => {
          list1.push({ id: doc.id, ...doc.data() });
        });
        setPatientsData(list1);
        console.log(list1);
      } catch (err) {
        console.log(err);
      }

      try {
        const querySnapshot = await getDocs(collection(db, "community"));
        querySnapshot.forEach((doc) => {
          list2.push({ id: doc.id, ...doc.data() });
        });
        setCommunityData(list2);
        console.log(list2);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="change-password-main">
      <form className="change-password-container">
        {/* <input type="password" placeholder="Enter current password" onChange={(e)=>{setPassword(e.target.value)}}/> */}

        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        {validation && newPassword.length <= 5 ? (
          <label style={{ color: "red" }}>Too short password!</label>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {validation && confirmPassword !== newPassword ? (
          <label style={{ color: "red" }}>Password does not match!</label>
        ) : (
          ""
        )}
        <Button variant="outlined" size="small" onClick={handleSubmit}>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
