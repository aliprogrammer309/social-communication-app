import React, { useState } from "react";
import Add from "../../assets/addAvatar.png";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const PatientSignUp = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const patient = "yes";
  const [validation, setValidation] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);
  const [answer, setAnswer] = useState("");

  // const [file, setFile] = useState("");
  const [location, setLocation] = useState("");
  const [cancerType, setCancerType] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const firstName = e.target[0].value;
    // const lastName = e.target[1].value;
    const displayName = firstName + " " + lastName;
    // const userName = e.target[2].value;
    const file = "";
    // const file = e.target[11].files[0];
    // const password = e.target[3].value;
    // const email = e.target[4].value;
    // const phone = e.target[5].value;
    // const age = e.target[6].value;
    const gender = e.target[7].value;
    const security_question = e.target[8].value;

    // const location = e.target[8].value;
    // const cancerType = e.target[9].value;
    const status = e.target[12].value;

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      userName.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      age <= 17 ||
      location.length === 0 ||
      cancerType === 0
    ) {
      setValidation(true);
      // return 0;
    } else {
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                userName,
                email,
                phone,
                age,
                gender,
                location,
                cancerType,
                status,
                security_question,
                patient,
                answer,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, "patients", res.user.uid), {
                uid: res.user.uid,
                displayName,
                userName,
                email,
                phone,
                age,
                gender,
                location,
                cancerType,
                status,
                security_question,
                answer,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              alert("Registered successfully!")
              signOut(auth);
              navigate("/login");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="card">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className="container">
        <div>
          <div className="row">
            <div>
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                name="first name"
                placeholder="Enter your First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {validation && firstName.length === 0 ? (
                <label style={{ color: "red" }}>
                  First name can't be empty!
                </label>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="last name"
                placeholder="Enter your Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              {validation && lastName.length === 0 ? (
                <label style={{ color: "red" }}>
                  First name can't be empty!
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
              />
              {validation && userName.length === 0 ? (
                <label style={{ color: "red" }}>
                  User name can't be empty!
                </label>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
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
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="email">Email:</label>
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
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {validation && phone.length <= 10 ? (
                <label style={{ color: "red" }}>Phone must be 11 digits!</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              />
              {validation && age <= 17 ? (
                <label style={{ color: "red" }}>Age must be 18 or above!</label>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="question">Select Security Question:</label>
              <select id="question" name="question">
                <option value="What is the name of your first pet?">
                  What is the name of your first pet?
                </option>
                <option value="What was your first car?">
                  What was your first car?
                </option>
                <option value="What elementary school did you attend?">
                  What elementary school did you attend?
                </option>
                <option value="What is name of town where you born?">
                  What is name of town where you born?
                </option>
              </select>
            </div>
            <div>
              <label for="age">Answer:</label>
              <input
                type="text"
                id="answer"
                name="answer"
                placeholder="Answer of security question"
                onChange={(e) => setAnswer(e.target.value)}
              />
              {/* {validation && age <= 0 ? (
                <label style={{ color: "red" }}>Invalid age!</label>
              ) : (
                ""
              )} */}
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your location"
                onChange={(e) => setLocation(e.target.value)}
              />
              {validation && location.length === 0 ? (
                <label style={{ color: "red" }}>Invalid location!</label>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="cancer type">Cancer Type:</label>
              <input
                type="text"
                id="cancer type"
                name="cancer type"
                placeholder="Enter your cancer type"
                onChange={(e) => setCancerType(e.target.value)}
              />
              {validation && cancerType.length === 0 ? (
                <label style={{ color: "red" }}>Invalid input!</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="status">Status:</label>
              <select id="status" name="status">
                <option value="Married">Married</option>
                <option value="Not Married">Not Married</option>
              </select>
            </div>
            {/* <div>
              <input
                required
                style={{ display: "none" }}
                type="file"
                id="file"
                onClick={(e) => setFile(e.target.files[0])}

              />
              <label htmlFor="file" className="dp">
                <img src={Add} alt="" style={{ width: "30px" }} />
                <span>Upload your Image</span>
              </label>
            </div> */}
          </div>
        </div>

        <div className="btn">
          <button className="btn1">Register</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
        </div>
      </form>
    </div>
  );
};

export default PatientSignUp;
