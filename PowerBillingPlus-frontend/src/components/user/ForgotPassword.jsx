// ForgotPassword.jsx:

import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import LoginPageImage from "../../assets/hero-img.png.svg";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          margin: "2.5% 0 4% 0",
          display: "flex",
          justifyContent: "center",
          padding: "0 2%"
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: 2,
                textAlign: "center",
                backgroundColor: "#f6f9ff"
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Forgot Password
              </Typography>
              <Typography variant="h6" sx={{ margin: "1rem 0" }}>
                Enter the OTP code:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}
              >
                {Array.from({ length: 4 }, (_, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    variant="outlined"
                    sx={{ width: "40px", marginLeft: "5px" }}
                    inputProps={{ maxLength: 1 }}
                    size="small"
                  />
                ))}
              </Box>
              <Typography variant="body1" sx={{ color: "#555" }}>
                We have sent an OTP code to your email address.
              </Typography>
              <Box sx={{ marginTop: "2rem" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "auto",
                    backgroundColor: "#4154F1",
                    "&:hover": { backgroundColor: "#3148C5" }
                  }}
                >
                  PROCEED
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <img
              src={LoginPageImage}
              alt="Forgot Password Illustration"
              style={{ width: "70%", maxWidth: "300px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ForgotPassword;
