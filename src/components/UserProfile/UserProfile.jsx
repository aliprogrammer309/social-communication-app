import React from "react";
import { useLocation } from "react-router-dom";
import './userProfile.scss'

const UserProfile = () => {
  const location = useLocation();
  const name = location.state?.obj.displayName;
  const email = location.state?.obj.email;
  const phone = location.state?.obj.phone;
  const gender = location.state?.obj.gender;
  const img_url = location.state?.obj.photoURL;
//   const img_url = location.state?.obj.photoURL;


  return <>
      <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img_url}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">
                    {gender}
                  </span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
      </div>
    </div>
  </>;
};

export default UserProfile;
