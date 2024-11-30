import "./LandingPage.css";
import Header from "./Header";
import LoginPageImage from "../../assets/hero-img.png.svg";
import GetStartImage from "../../assets/elec 1.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Grid } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Header />
      <div className="LandingPage">
        <div className="a1">
          <div className="head_div">
            <div>
              <h1>Welcome to Power Billing Plus!</h1>
              <br />
              <h4>Efficient and Effective Electricity Billing System</h4>
            </div>
            <br />

            <div className="contbtn">
              <Button variant="contained" onClick={() => navigate("/login")}>
                Continue as User
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/adminlogin")}
              >
                Continue as Admin
              </Button>
            </div>
          </div>

          <div className="loginImage">
            <img src={LoginPageImage} alt="app_img"></img>
          </div>
        </div>

        <div id="about">
          <div className="GetStartImage">
            <img src={GetStartImage} alt="app_img" />
          </div>
          <div className="a2">
            <div>
              <h4>About us</h4>
            </div>
            <br />
            <div>
              <p>
                <b>Empowering your energy choices for a brighter tomorrow.</b>
              </p>
              <p>
                NEABilling is an online platform that allows customers to
                conveniently generate, pay, and view their electricity bills.
                Through the system, customers can access their account and view
                their current and past electricity bills. The system
                automatically generates bills based on the customers electricity
                usage. This system provides customers with a hassle-free way to
                manage their electricity bills from the comfort of their homes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="footer">
        <Footer />
      </div>
    </Grid>
  );
};

export default LandingPage;

// import "./LandingPage.css";
// import Header from "./Header";
// import LoginPageImage from "../../assets/hero-img.png.svg";
// import GetStartImage from "../../assets/elec 1.svg";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import { Grid, Box, Typography } from "@mui/material";

// const LandingPage = () => {
//   const navigate = useNavigate();
//   return (
//     <Grid container>
//       <Header />
//       <Box className="LandingPage" sx={{ padding: { xs: "20px", md: "40px" } }}>
//         <Grid container spacing={4} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <Box textAlign="center">
//               <Typography
//                 variant="h1"
//                 component="h1"
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Welcome to Power Billing Plus!
//               </Typography>
//               <Typography variant="h4" sx={{ margin: "20px 0" }}>
//                 Efficient and Effective Electricity Billing System
//               </Typography>
//               <Box
//                 className="contbtn"
//                 sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
//               >
//                 <Button variant="contained" onClick={() => navigate("/login")}>
//                   Continue as User
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => navigate("/adminlogin")}
//                 >
//                   Continue as Admin
//                 </Button>
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box textAlign="center">
//               <img
//                 src={LoginPageImage}
//                 alt="Login Illustration"
//                 style={{ width: "100%", maxWidth: "400px" }}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Box id="about" sx={{ marginTop: "40px", textAlign: "center" }}>
//           <Typography variant="h4" component="h4" sx={{ marginBottom: "20px" }}>
//             About Us
//           </Typography>
//           <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//             <strong>
//               Empowering your energy choices for a brighter tomorrow.
//             </strong>
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ maxWidth: "600px", margin: "0 auto" }}
//           >
//             NEABilling is an online platform that allows customers to
//             conveniently generate, pay, and view their electricity bills.
//             Through the system, customers can access their account and view
//             their current and past electricity bills. The system automatically
//             generates bills based on the customers electricity usage. This
//             system provides customers with a hassle-free way to manage their
//             electricity bills from the comfort of their homes.
//           </Typography>
//           <Box sx={{ marginTop: "20px" }}>
//             <img
//               src={GetStartImage}
//               alt="Getting Started Illustration"
//               style={{ width: "100%", maxWidth: "400px" }}
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Footer />
//     </Grid>
//   );
// };

// export default LandingPage;
