import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SignUp.css";
import SignupImage from "../../assets/hero-img.png.svg";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can now send `formData` to your API or perform other actions
  };

  return (
    <div className="SignUp">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: 2,
          height: { xs: "74vh", sm: "100vh", backgroundColor: "#f0f4ff" },
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <div className="signinfo">
            <Typography variant="h4" gutterBottom>
              Power Billing Plus
            </Typography>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="h6">
              Admin must have an account to login!
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ m: 0.5, width: "100%" }}
                label="Full Name"
                variant="standard"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                sx={{ m: 0.5, width: "100%" }}
                label="Email"
                variant="standard"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                sx={{ m: 0.5, width: "100%" }}
                label="Mobile Number"
                variant="standard"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <TextField
                sx={{ m: 0.5, width: "100%" }}
                label="Address"
                variant="standard"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <FormControl sx={{ m: 0.5, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                type="submit"
                sx={{ width: "auto", marginTop: 2, backgroundColor: "#0D6EFD" }}
                variant="contained"
              >
                Signup
              </Button>
            </form>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        >
          <div className="signupImage">
            <img className="signupImage2" src={SignupImage} alt="app_img" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
