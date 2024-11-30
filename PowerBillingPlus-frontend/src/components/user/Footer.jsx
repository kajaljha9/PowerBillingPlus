import { Grid } from "@mui/material";
import "./Footer.css";
import { Outlet, Link } from "react-router-dom";

function Footer() {
  return (
    <Grid container>
      <div className="footer">
        <div className="f1">
          <h3>PowerBilling Plus</h3>
          <br />
          <p>Powering your life with convinience and affordability</p>
        </div>

        <div className="f2">
        <div id="f2b">
        <h4>Useful Links</h4>
          <nav>
            <ul>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/">
                  About
                </Link>
              </li>
              <li>
                <Link className="link" to="/">
                  Features
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
          
        </div>

        <div className="f3">
          <h4>Contact Us</h4>
          <br />
          <p>Central Office, MG Road Delhi</p>
          <p>India</p>
          <p>Telephone:9999999999</p>
          <p>Email:powerbillingplus@gmail.com</p>
        </div>
      </div>
    </Grid>
  );
}

export default Footer;
