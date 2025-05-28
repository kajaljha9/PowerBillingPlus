// src/LandingPage.jsx
import "./LandingPage.css";
import Header from "./components/user/UserHeader";
import LoginPageImage from "./assets/hero-img.png.svg";
import Footer from "./components/user/UserFooter";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography,  Slide } from "@mui/material";
import paymentImage from "/src/assets/paymentgate.jpg";
import bulbcalculater from "/src/assets/bulbCalculater.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container className="landing-container">
      <Header />
      <div className="LandingPage">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <Slide direction="down" in timeout={800}>
              <div>
                <Typography variant="h3" className="hero-title">
                  Welcome to <span>Power Billing Plus</span>
                </Typography>
                <Typography variant="h6" className="hero-subtitle">
                  Smart and Hassle-free Electricity Billing System
                </Typography>
              </div>
            </Slide>

            <div className="contbtn">
              <Button variant="contained" onClick={() => navigate("/login")}>
                Continue as User
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/adminlogin")}
              >
                Continue as Admin
              </Button>
            </div>
          </div>
          <div className="hero-image">
            <img src={LoginPageImage} alt="App Preview" />
          </div>
        </div>

        {/* About Section */}
        <div className="about-section" id="about">
          <div className="about-image">
            <img src={bulbcalculater} alt="Electricity Illustration" />
          </div>
          <div className="about-content">
            <Typography variant="h4">About Power Billing Plus</Typography>
            <p>
              <b>
                Empowering your energy decisions with ease and transparency.
              </b>
            </p>
            <p>
              Power Billing Plus is a digital platform that allows users to
              easily access, manage, and pay their electricity bills. Designed
              for both administrators and users, the platform offers seamless
              bill generation, payment tracking, and historical billing access —
              all with an intuitive, secure interface.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section" id="features">
          <div className="features-content">
            <Typography variant="h4">Why Choose Us?</Typography>
            <ul>
              <li>⚡ Smart and accurate bill calculations</li>
              <li>📊 Dashboard for admins with graphs & metrics</li>
              <li>🔐 Secure authentication for both users and admins</li>
              <li>💳 Instant bill payment with confirmation</li>
              <li>📜 History of paid and unpaid bills</li>
              <li>🌐 Fully responsive & mobile-friendly</li>
            </ul>
          </div>
          <div className="features-image">
            <img src={paymentImage} alt="Billing Features" />
          </div>
        </div>
      </div>

      <Footer />
    </Grid>
  );
};

export default LandingPage;
