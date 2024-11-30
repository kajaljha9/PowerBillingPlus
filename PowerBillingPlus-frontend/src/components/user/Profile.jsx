import Image1 from "../../assets/image 4.svg";
import "./Profile.css";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
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
            <p>Name: Albina Shrestha</p>
            <p>Username: albinashrestha</p>
            <p>Address: Nakhipot</p>
            <p>Phone No: 9999999999</p>
            <p>Email: albina@gmail.com</p>
            <p>Password: *******</p>
            <Button variant="contained" color="success">
              Edit
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;
