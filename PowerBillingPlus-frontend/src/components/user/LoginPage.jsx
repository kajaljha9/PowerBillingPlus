import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./LoginPage.css";
import LoginPageImage from "../../assets/hero-img.png.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../CommonFiles/Loader";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log("login", loginForm);
    setLoading(true);
    try {
      let res = await axios.post(`http://localhost:3000/login`, loginForm);
      console.log("login response", res);

      // Extract user data and role from the response
      const data = res.data.user;
      const role = data.role; // Assuming the role is available in the user object

      // Check if the role is admin
      if (role === "admin") {
        // Navigate to the admin dashboard
        window.location.href = "/dashboard";
      } else {
        // Navigate to viewbill (or another page if required)
        window.location.href = "/viewbill";
      }

      // Store token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loginCred", JSON.stringify(data));
    } catch (error) {
      console.log("error", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster />
      {loading && <Loader />}
      <Box
        className="LoginPage"
        sx={{ padding: { xs: "20px", md: "40px" }, backgroundColor: "#f0f4ff" }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="loginfo" sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Power Billing Plus
              </Typography>
              <Typography variant="h5" sx={{ marginBottom: 4 }}>
                User Login
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 4 }}>
                You can only login if you are registered from the admin!
              </Typography>
              <TextField
                id="email"
                label="Enter registered email"
                variant="filled"
                value={loginForm.email}
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={(event) => {
                  setLoginForm({ ...loginForm, email: event.target.value });
                }}
              />
              <FormControl variant="filled" fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm({
                      ...loginForm,
                      password: event.target.value,
                    });
                  }}
                  endAdornment={
                    <InputAdornment sx={{ width: "auto" }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ width: "auto" }}
              >
                Login
              </Button>
              <Box sx={{ marginTop: 2 }}>
                <a
                  href="##"
                  onClick={() => navigate("/forgotpassword")}
                  className="fp"
                >
                  Forgot password?
                </a>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <img
              className="loginImage"
              src={LoginPageImage}
              alt="Login Illustration"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
