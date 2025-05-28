// src/components/admin/AdminSignUp.jsx:

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerAdmin } from "../../api/apiService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import "../styles/AdminGlobal.css";
import backphoto from "../../assets/backphoto.jpg";

const AdminSignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(form);
      toast.success("Admin registered successfully!");
      setTimeout(() => navigate("/adminlogin"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backphoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "8px 0px 10px 0px",
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
              Admin Sign Up - Power Billing Plus
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              Sign Up
            </Button>
          </form>
          <br />
          <Button onClick={() => navigate("/")}>Back</Button>
        </Box>
      </Container>
    </div>
  );
};

export default AdminSignUp;
