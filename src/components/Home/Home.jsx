import React from "react";
import "./home.css";
import banner from "../../assets/home_banner.jpg";
import bot from "../../assets/bot.jpeg";

const Home = () => {
  return (
    <>
      <div className="home-header">
        <h1>Welcome to our community</h1>
      </div>
      <div className="home-main">
        <img src={banner} alt="" />
        <div className="home-main-text">
          <h2>Find your community with us</h2>
          <p>
            We believe society is is stronger than cancer. <br /> We are here to
            bring together cancer patients in the community. So no one faces
            cancer alone.
          </p>
        </div>
        <div style={{ width: "100%" }}>
          <img
            style={{
              width: "100px",
              height: "100px",
              float: "right",
              cursor: "pointer",
            }}
            src={bot}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Home;
