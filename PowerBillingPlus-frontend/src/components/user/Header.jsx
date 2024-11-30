import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";
import { Grid } from "@mui/material";

const Header = () => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openDrawer = () => {
    setDrawer(true);
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

  const goToSection = async (e) => {
    let id = e.target.getAttribute("data-goto");
    let projects = document.getElementById(`${id}`);

    if (drawer) {
      closeDrawer();
      setTimeout(() => {
        window.scrollTo({
          top: projects.offsetTop - 50,
          left: 0,
          behavior: "smooth",
        });
      }, 1000);
    } else {
      window.scrollTo({
        top: projects.offsetTop - 50,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleLoginLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginCred");
    }
    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      if (drawer) {
        document.getElementsByClassName("drawerCont")[0].style.transition =
          "0.5s linear";
        document.getElementsByClassName("drawerCont")[0].style.transform =
          "translateX(-50vw)";
      }
    }, -100);
  }, [drawer]);

  return (
    <Grid container>
      <div className="header">
        <div onClick={() => navigate("/")} className="icon-name">
          <div className="icon">
            <ElectricBoltIcon />
          </div>
          <div className="name">
            <h3>Power Billing Plus</h3>
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
              <li>
                <Link className="link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" to="/viewbill">
                  Bill
                </Link>
              </li>
              <li>
                <span className="link" onClick={handleLoginLogout}>
                  {token ? "Logout" : "Login"}
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </Grid>
  );
};

export default Header;
