import "./AdminProfile.css";
import Avatar from "../../assets/image 4.svg";
import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

const AdminProfile = () => {
  const [adminInfo, setAdminInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "Admin";
    const email = localStorage.getItem("adminEmail") || "admin@example.com";
    setAdminInfo({ name, email });
  }, []);

  return (
    <AdminLayout>
      <div className="adminContainer">
        <div className="adminCard">
          <h1 className="profileTitle">Your Profile</h1>
          <div className="profileContent">
            <div className="profileDetails">
              <p>
                <strong>Name:</strong> {adminInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {adminInfo.email}
              </p>
            </div>
            <div className="profileAvatar">
              <img src={Avatar} alt="Admin Avatar" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
