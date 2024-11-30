import "./AdminProfile.css";
import Navbar from "./Navbar";
import Avatar from "../../assets/Avatar.svg";
import Button from "@mui/material/Button";

const AdminProfile = () => {
  return (
    <>
      <div className="AdminProfile">
        <div className="gnav">
          <Navbar />
        </div>

        <div className="adminDetails">
          <div className="a">
            &nbsp;&nbsp;<h2>Your Profile</h2>
          </div>
          <br />
          <div className="bc">
            <div className="b">
              <ul>
                <li>
                  Name: <b>Admin</b>
                </li>

                <li>
                  Address: <b>Delhi</b>
                </li>
                <li>
                  MobileNo.: <b>1234567890</b>
                </li>
                <li>
                  Email: <b>admin@gmail.com</b>
                </li>
                <li>
                  Password: <b>*********</b>
                </li>
              </ul>
            </div>
            <div className="c">
              <div>
                <img src={Avatar} alt="Avatar" />
              </div>
              <div className="editbtn">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
