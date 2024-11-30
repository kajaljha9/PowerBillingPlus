import "./Navbar.css";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Outlet, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Grid } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };
  return (
    <div className="Navbar">
      <div className="sysNavbar">
        <div className="Navbar1" onClick={() => navigate("/")}>
          <ElectricBoltIcon sx={{ cursor: "pointer" }} />
          <b style={{ cursor: "pointer" }}>Power Billing Plus</b>
        </div>
        <hr />
        <div className="Navbar2">
          <nav>
            <ul>
              <li>
                <HomeIcon />
                &nbsp;&nbsp;
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {/* <li>
                <EqualizerIcon />
                &nbsp;&nbsp;
                <Link className="link" to="/reports">
                  Reports
                </Link>
              </li> */}
              <li>
                <PersonIcon />
                &nbsp;&nbsp;
                <Link className="link" to="/manageuser">
                  Manage User
                </Link>
              </li>
              <li>
                <ReceiptLongIcon />
                &nbsp;&nbsp;
                <Link className="link" to="/managebill">
                  Manage Bill
                </Link>
              </li>
              <li>
                <AccountBoxIcon />
                &nbsp;&nbsp;
                <Link className="link" to="/adminprofile">
                  Admin Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="Navbar3">
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("loginCred");
              localStorage.removeItem("selectedUser");

              navigate("/");
            }}
            variant="contained"
          >
            Logout
          </Button>
        </div>

        <Outlet />
      </div>

      <div className="MobileNavbar">
        <Grid
          sx={{ display: "flex", justifyContent: "flex-start" }}
          className="nav-toggle"
          onClick={toggleMenu}
        >
          <div className="Navbar1">
            <ElectricBoltIcon />
            <b>Power Billing Plus</b>
          </div>
          {navOpen ? <CloseIcon /> : <MenuIcon />}{" "}
        </Grid>
        <hr />

        <div className={`mNavbar ${navOpen ? "open" : ""}`}>
          <div className="Navbar2">
            <nav>
              <ul>
                <li>
                  <HomeIcon />
                  &nbsp;&nbsp;
                  <Link className="link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <EqualizerIcon />
                  &nbsp;&nbsp;
                  <Link className="link" to="/reports">
                    Reports
                  </Link>
                </li>
                <li>
                  <PersonIcon />
                  &nbsp;&nbsp;
                  <Link className="link" to="/manageuser">
                    Manage User
                  </Link>
                </li>
                <li>
                  <ReceiptLongIcon />
                  &nbsp;&nbsp;
                  <Link className="link" to="/managebill">
                    Generate Bill
                  </Link>
                </li>
                <li>
                  <AccountBoxIcon />
                  &nbsp;&nbsp;
                  <Link className="link" to="/adminprofile">
                    Admin Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="Navbar3">
            <Button
              sx={{ width: "fit-content" }}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("loginCred");
                localStorage.removeItem("selectedUser");
                navigate("/");
              }}
              variant="contained"
            >
              Logout
            </Button>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
