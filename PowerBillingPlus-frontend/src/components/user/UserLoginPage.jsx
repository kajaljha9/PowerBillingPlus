// src/components/user/UserLoginPage.jsx
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./UserLoginPage.css";
import LoginPageImage from "../../assets/hero-img.png.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import { Box, Typography, Grid } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { userLogin } from "../../api/apiService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [loading, setLoading] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await userLogin(loginForm); // API call
      const data = res.data.user;
      const token = res.data.token;

      if (!token || !data) {
        throw new Error("Invalid response from server");
      }

      // Store credentials
      localStorage.setItem("token", token);
      localStorage.setItem("loginCred", JSON.stringify(data));

      toast.success("Login successful!");

      // ✅ Redirect based on role
      const role = data.role;
      if (role === "admin") {
        navigate("/dashboard"); // Admin dashboard
      } else {
        navigate("/viewbill"); // User bill page
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster />

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

              <FormControl variant="filled" fullWidth sx={{ marginBottom: 2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // prevent page reload
                    handleLogin(); // call your login function
                  }}
                >
                  <TextField
                    id="email"
                    label="Enter registered email"
                    variant="filled"
                    value={loginForm.email}
                    fullWidth
                    autoComplete="email"
                    sx={{ marginBottom: 2 }}
                    onChange={(event) =>
                      setLoginForm({ ...loginForm, email: event.target.value })
                    }
                  />

                  <FormControl
                    variant="filled"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  >
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      autoComplete="current-password"
                      onChange={(event) =>
                        setLoginForm({
                          ...loginForm,
                          password: event.target.value
                        })
                      }
                      endAdornment={
                        <InputAdornment position="end">
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
                    type="submit"
                    sx={{ width: "auto" }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </FormControl>
              <Button onClick={() => navigate("/")}>Back</Button>

              {/* <Box sx={{ marginTop: 2 }}>
                <a
                  href="##"
                  onClick={() => navigate("/forgotpassword")}
                  className="fp"
                >
                  Forgot password?
                </a>
              </Box> */}
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
