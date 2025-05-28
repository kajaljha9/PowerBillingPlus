// src/components/admin/AddUser.jsx:
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import {
  LocationOn,
  Visibility,
  VisibilityOff,
  LocalPhone,
  Email
} from "@mui/icons-material";
import Navbar from "./AdminNavbar";
import toast, { Toaster } from "react-hot-toast";
import { addUser, getUserById, updateUser } from "../../api/apiService";
import "./AddUser.css";
import AdminNavbar from "./AdminNavbar";
import AdminLayout from "./AdminLayout";

const AddUser = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const regions = [
    "North",
    "South",
    "East",
    "West",
    "Northeast",
    "Northwest",
    "Southeast",
    "Southwest"
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    meterId: "",
    address: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((res) => {
          console.log("Fetched user data:", res.data);
          setFormData(res.data);
        })
        .catch(() => toast.error("Failed to fetch user data"));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.region) errors.region = "Region is required";
    if (!formData.meterId) errors.meterId = "Meter ID is required";
    if (!formData.password && !id) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      if (id) {
        await updateUser(id, formData);
        toast.success("User updated successfully!");
      } else {
        await addUser(formData);
        toast.success("User added successfully!");
      }
      navigate("/manageuser");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="AddUser">
        <div className="adduserDetails">
          <h2>{id ? "Update User" : "Add User"}</h2>

          <form onSubmit={handleSubmit}>
            {/* Region Dropdown */}
            <Autocomplete
              disablePortal
              options={regions}
              value={formData.region}
              onChange={(e, value) => {
                const selectedRegion = value || "";
                const randomNum = Math.floor(100000 + Math.random() * 900000);
                const generatedMeterId = selectedRegion
                  ? `${selectedRegion.toUpperCase()}-${randomNum}`
                  : "";

                setFormData((prev) => ({
                  ...prev,
                  region: selectedRegion,
                  meterId: generatedMeterId
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Region"
                  error={Boolean(formErrors.region)}
                  helperText={formErrors.region}
                />
              )}
            />
            <br />
            {/* Full Name */}
            <FormControl fullWidth error={Boolean(formErrors.name)}>
              <InputLabel>Full Name</InputLabel>
              <OutlinedInput
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                label="Full Name"
              />
              {formErrors.name && (
                <span className="error">{formErrors.name}</span>
              )}
            </FormControl>
            <br /> <br />
            <Grid container spacing={2}>
              {/* Address */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(formErrors.address)}>
                  <InputLabel>Address</InputLabel>
                  <OutlinedInput
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    label="Address"
                    endAdornment={
                      <InputAdornment position="end">
                        <LocationOn />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              {/* Phone */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(formErrors.phone)}>
                  <InputLabel>Phone No.</InputLabel>
                  <OutlinedInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    label="Phone No."
                    endAdornment={
                      <InputAdornment position="end">
                        <LocalPhone />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br />
            {/* Email */}
            <FormControl fullWidth error={Boolean(formErrors.email)}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                label="Email"
                endAdornment={
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <br /> <br />
            {/* Meter ID */}
            <FormControl fullWidth>
              <InputLabel>Meter ID</InputLabel>
              <OutlinedInput
                name="meterId"
                value={formData.meterId}
                label="Meter ID"
                readOnly
              />
            </FormControl>
            <br /> <br />
            {/* Password (only for new users) */}
            {!id && (
              <>
                <FormControl fullWidth error={Boolean(formErrors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </>
            )}
            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ width: "auto", backgroundColor: "#4318ff" }}
            >
              {/* {loading ? "Saving..." : id ? "Update User" : "Add User"} */}
              {loading ? <span className="spinner" /> : null}
              {loading ? "Saving..." : id ? "Update User" : "Add User"}
            </Button>
          </form>
        </div>
        <Toaster />
      </div>
    </AdminLayout>
  );
};

export default AddUser;
