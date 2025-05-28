// src/components/user/UserHeader.jsx

import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Typography } from "@mui/material";
import "./UserHeader.css";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToSection = async (e) => {
    const id = e.target.getAttribute("data-goto");
    const element = document.getElementById(id);
    if (!element) return;

    if (drawer) {
      closeDrawer();
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1000);
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const closeDrawer = () => {
    setTimeout(() => {
      setDrawer(false);
    }, 800);
    if (drawer) {
      let drawerCont = document.getElementsByClassName("drawerCont")[0];
      drawerCont.style.transition = "1s linear";
      drawerCont.style.transform = "translateX(50vw)";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginCred");
    navigate("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem("loginCred");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Grid container>
      <div className="header">
        <div onClick={() => navigate("/")} className="icon-name">
          <div className="icon">
            <ElectricBoltIcon /> Power Billing Plus
          </div>
        </div>

        <Grid
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className="menu-toggle"
          onClick={toggleMenu}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </Grid>

        <div id="navbar" className={`navbar ${menuOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li>
                <Link
                  className="link"
                  to="/"
                  data-goto="home"
                  onClick={goToSection}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  to="/"
                  data-goto="about"
                  onClick={goToSection}
                >
                  About
                </Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link className="link" to="/viewbill">
                      Bills
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <span className="link" onClick={handleLogout}>
                      Logout
                    </span>
                  </li>
                </>
              )}

              {!user && (
                <li>
                  <Link className="link" to="/login">
                    UserLogin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {user && (
          <div className="welcome-box">
            <Typography variant="body1">
              Welcome, <strong>{user.name || user.email}</strong>
            </Typography>
          </div>
        )}

        <Outlet />
      </div>
    </Grid>
  );
};

export default Header;
