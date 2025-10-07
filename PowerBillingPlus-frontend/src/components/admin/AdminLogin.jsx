//src/components/admin/AdminLogin.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper
} from "@mui/material";
import elecpoleImg from "../../assets/elecpole.jpg";
import poleback from "../../assets/poleback.jpg";
import backphoto from "../../assets/backphoto.jpg";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAdmin } from "../../api/apiService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import "../styles/AdminGlobal.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(form);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.name);
      localStorage.setItem("adminEmail", res.data.email);

      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    // <div className="AdminLogin" >
    <div
      className="AdminLogin"
      style={{
        backgroundImage: `url(${backphoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Container maxWidth="sm">
        <Toaster />
        <Box className="admin-card" sx={{ mt: 10 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ElectricBoltIcon sx={{ fontSize: 32, color: "#4318ff" }} />
            <Typography variant="h5" fontWeight={600}>
              Admin Login - Power Billing Plus
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="admin-button"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
               {/* <Typography
                variant="body2"
                 sx={{ cursor: "pointer", color: "#4318ff" }}
                onClick={() => navigate("/AdminSignUp")} 
              >
                 New Admin? Sign Up 
              </Typography>  */}
              <Typography
    variant="body2"
    
  >
    Test login: admin@gmail.com / admin@123
  </Typography>
              <Button onClick={() => navigate("/")}>Back</Button> 
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;
