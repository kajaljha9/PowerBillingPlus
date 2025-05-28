// src/components/user/UserFooter.jsx

import { Grid, Typography } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "./UserFooter.css";
import { useState } from "react";

function Footer() {
  const [drawer, setDrawer] = useState(false);

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

  return (
    <Grid container component="footer" className="footer">
      <div className="footer-container">
        <div className="footer-column f1">
          <Typography variant="h6">⚡ PowerBilling Plus</Typography>
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Powering your life with convenience and affordability.
          </Typography>
        </div>

        <div className="footer-column f2">
          <Typography variant="h6">Useful Links</Typography>
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
              <li>
                <Link className="link" to="/viewbill">
                  Your Bills
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-column f3">
          <Typography variant="h6">Contact Us</Typography>
          <div className="contact-info">
            <p>
              <LocationOnIcon fontSize="small" /> Central Office, MG Road Delhi,
              India
            </p>
            <p>
              <PhoneIcon fontSize="small" /> +91 9999999999
            </p>
            <p>
              <EmailIcon fontSize="small" /> powerbillingplus@gmail.com
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </Grid>
  );
}

export default Footer;
