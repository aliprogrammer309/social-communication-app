import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import "./login.css";
import { Button } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [validation, setValidation] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [dbErr, setDbErr] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const email = e.target[0].value;
    // const password = e.target[1].value;
    if (email.length === 0 || password.length === 0) {
      setErr(true);
      setValidation(true);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        for (let index = 0; index < patientsData.length; index++) {
          if (user.uid === patientsData[index].uid) {
            navigate("/PersonalProfile");
            alert("Logged in as a patient!");
            break;
          }
        }
        for (let index = 0; index < communityData.length; index++) {
          if (user.uid === communityData[index].uid) {
            navigate("/CommunityProfile");
            alert("Logged in as a community member!");
            break;
          }
        }
      } catch (err) {
        setDbErr(true);
        // console.log(err);
      }
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

  const handleForgotPassword = () => {
    if (email.length === 0) {
      // setErr(true);
      setValidation(true);
    } else {
      navigate("/ForgotPassword", { state: { user_email: email } });
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {validation && email.includes("@") === false ? (
              <label style={{ color: "red" }}>Invalid email address!</label>
            ) : (
              ""
            )}
            {/* {err && <label style={{ color: "red" }}>Invalid Email!</label>} */}
          </div>
          <div>
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {validation && password.length <= 5 ? (
              <label style={{ color: "red" }}>
                Password must be atleast 6 digit long!
              </label>
            ) : (
              ""
            )}
            {/* {err && <label style={{ color: "red" }}>Invalid Password!</label>} */}
          </div>
        </div>
        {dbErr && (
          <label style={{ textAlign: "center", color: "red" }}>
            Invalid email or Password!
          </label>
        )}
        <div className="btn">
          <button className="btn1">Login</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <h5>Don't have an account?</h5>
          <Link to="/communitySignup">Register as a community member</Link>
          <br />
          <Link to="/patientSignup">Register as a patient</Link>
          <br />
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </Button>
          <br />
          <Link to="/AdminLogin">
            <button style={{ margin: "20px", padding: "0.3rem" }}>
              Log In As Admin
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
