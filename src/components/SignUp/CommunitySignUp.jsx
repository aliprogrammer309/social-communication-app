import React, { useState } from "react";
import Add from "../../assets/addAvatar.png";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./signup.css";
// import { validate } from "uuid";

const CommunitySignUp = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const patient = "no";

  const [validation, setValidation] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [age, setAge] = useState(0);
  // const [file, setFile] = useState("");
  // console.log(firstName);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const firstName = e.target[0].value;
    // const lastName = e.target[1].value;
    const displayName = firstName + " " + lastName;
    // const userName = e.target[2].value;

    // const file = e.target[8].files[0];
    const file =
      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

    // const password = e.target[3].value;
    // const email = e.target[4].value;
    // const phone = e.target[5].value;
    // const age = e.target[6].value;
    const security_question = e.target[6].value;
    console.log(security_question);
    const gender = e.target[9].value;
    console.log(gender);
    // const location = e.target[8].value;
    // const cancerType = e.target[9].value;
    // const status = e.target[10].value;

    // if (
    //   firstName.trim().length === 0 ||
    //   lastName.trim().length === 0 ||
    //   userName.trim().length === 0 ||
    //   password.trim().length === 0 ||
    //   email.trim().length === 0 ||
    //   email.includes("@") === false ||
    //   phone.trim().length === 0
    //   // age.length === 0
    // ) {
    //   setValidation(true);
    //   // return;
    // }
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      userName.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      age <= 17
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
                photoURL: downloadURL,
                security_question,
                patient,
                answer,
              });

              await setDoc(doc(db, "community", res.user.uid), {
                uid: res.user.uid,
                displayName,
                userName,
                email,
                phone,
                age,
                gender,
                photoURL: downloadURL,
                security_question,
                answer,
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
              <label for="username">Username:</label>
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
            </div>
          </div>
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
            </div>
            <div>
              <label for="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {validation && phone.length <= 7 ? (
                <label style={{ color: "red" }}>Invalid Phone number!</label>
              ) : (
                ""
              )}
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
              <label>Answer:</label>
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
              <label for="age">Age:</label>
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
              <label for="gender">Gender:</label>
              <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {/* <div className="row">
            <input
              required
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              // onClick={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <img src={Add} alt="" style={{ width: "30px" }} />
              <span style={{ color: "red", cursor: "pointer" }}>
                Upload your Image
              </span>
            </label>
          </div> */}
        </div>
        <div className="btn">
          <button className="btn1">Register</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
        </div>
      </form>
    </div>
  );
};

export default CommunitySignUp;
