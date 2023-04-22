import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "@mui/icons-material/Delete";
import { collection, getDocs } from "firebase/firestore";
// import {auth} from '../../firebase';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [patientsData, setPatientsData] = useState([]);

  // console.log(currentUser);
  const [isMobile, setIsMobile] = useState(false);
  const user = auth.currentUser;
  // if (user !== null) {
  const displayName = user?.displayName;
  const profilePic = user?.photoURL;
  // }

  // console.log(user.);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let list1 = [];
        const querySnapshot = await getDocs(collection(db, "patients"));
        querySnapshot.forEach((doc) => {
          list1.push({ id: doc.id, ...doc.data() });
        });
        setPatientsData(list1);
        console.log(list1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const foundObject = patientsData.find((obj) => obj?.uid === user?.uid);

  const handleLogOut = () => {
    signOut(auth);
    alert("Logged Out!");
  };

  return (
    <nav className="navbar">
      {!currentUser ? (
        <h3 className="logo">Cancer Community</h3>
      ) : foundObject ? (
        <Link to="/PersonalProfile" style={{ color: "white" }}>
          <div className="profile-about">
            <img
              alt=""
              src={profilePic}
              style={{
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h3 className="logo">{displayName}</h3>
          </div>
        </Link>
      ) : (
        <Link to="/" style={{ color: "white" }}>
          <h3 className="logo">{displayName}</h3>
        </Link>
      )}
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <Link to="/" className="my-home">
          <li>Home</li>
        </Link>
        <Link to="/onlineCommunity" className="community">
          <li>Online Community</li>
        </Link>
        <Link to="/onlineChat" className="community">
          <li>Chat</li>
        </Link>
        {!currentUser ? (
          <Link to="/contact" className="contact">
            <li>Contact</li>
          </Link>
        ) : (
          ""
        )}
        {!currentUser ? (
          <Link to="/about" className="about">
            <li>About Us</li>
          </Link>
        ) : (
          <Link to="/changePassword" className="about">
            <li>Change Password</li>
          </Link>
        )}
        {!currentUser && (
          <Link to="/login" className="login">
            <li>Login</li>
          </Link>
        )}
        {currentUser && (
          <Link to="/login" className="login" onClick={handleLogOut}>
            <li>logout</li>
          </Link>
        )}
        {currentUser && (
          <Delete
            color="error"
            fontSize="large"
            style={{ cursor: "pointer" }}
          />
        )}
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
