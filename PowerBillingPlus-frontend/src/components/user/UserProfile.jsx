// src/components/user/UserProfile.jsx

import "./UserProfile.css";
import Button from "@mui/material/Button";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import Image1 from "../../assets/image 4.svg";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("loginCred")) || {};

  return (
    <>
      <Header />
      <div className="Profile">
        <h2 className="profile-title">Your Profile</h2>
        <div className="card">
          <div className="div1">
            <img src={Image1} alt="Profile" />
          </div>
          <div className="div2">
            <h3>Profile Details</h3>
            <p>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>
            <p>
              <strong>Meter ID:</strong> {user.meterId || "N/A"}
            </p>
            <p>
              <strong>Region:</strong> {user.region || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "N/A"}
            </p>
            <p>
              <strong>Phone No:</strong> {user.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
            <p>
              <strong>Password:</strong> ******
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
