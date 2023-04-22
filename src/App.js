import Login from "./components/Login/Login";
import CommunitySignUp from "./components/SignUp/CommunitySignUp";
import PatientSignUp from "./components/SignUp/PatientSignUp";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import OnlineCommunity from "./components/OnlineCommunity/OnlineCommunity";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "././context/AuthContext";
import ChatApp from "./components/ChatApp/ChatApp";
import Admin from "./components/Admin/Admin";
import UserProfile from "./components/UserProfile/UserProfile";
import AdminLogIn from "./components/Admin/AdminLogIn";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import ChangePassword from "./components/PersonalProfile/ChangePassword";
import ForgotPassword from "./components/Login/ForgotPassword";
import CommunityProfile from "./components/PersonalProfile/CommunityProfile";
import Post from "./components/Posts/Post";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/communitySignup" element={<CommunitySignUp />} />
        <Route path="/patientSignup" element={<PatientSignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/onlineCommunity" element={<CommunityProfile />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route
          path="/onlineChat"
          element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          }
        />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/AdminLogIn" element={<AdminLogIn />} />
        <Route path="/PersonalProfile" element={<PersonalProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/CommunityProfile" element={<CommunityProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
