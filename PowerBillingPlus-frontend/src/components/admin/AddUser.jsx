import Navbar from "./Navbar";
import "./AddUser.css";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import {
  LocationOn,
  Visibility,
  VisibilityOff,
  LocalPhone,
  Email,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const AddUser = () => {
  const { id } = useParams(); // Get user ID from URL params (for editing)
  const navigate = useNavigate(); // To redirect after form submission
  const [showPassword, setShowPassword] = useState(false); // Store fetched regions
  const [loading, setLoading] = useState(false); // Manage loading state
  // const [formData, setFormData] = useState({
  //   name: "",
  //   region: "",
  //   address: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  // });
  const initialFormState = {
    name: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  
  const [formErrors, setFormErrors] = useState({}); // To store validation errors

  useEffect(() => {
    // Fetch regions dynamically (you can skip this and use a hardcoded array if needed)
    // fetchRegions();

    // Fetch user data if editing
    if (id) fetchUserData(id); // If we are editing a user, fetch the data
  }, [id]);

  // const fetchRegions = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/admin/get");
  //     setRegions(response.data.users); // Update the `regions` state with fetched data
  //   } catch (err) {
  //     toast.error("Error fetching regions.");
  //   }
  // };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/get/${userId}`
      );
      setFormData(response.data.user); // Prefill form with the existing user data
    } catch (err) {
      toast.error("Error fetching user data.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.region) errors.region = "Region is required.";
    if (!formData.name) errors.name = "Full name is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email address.";
    if (!formData.password) errors.password = "Password is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission (either creating or updating a user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    setLoading(true);

    try {
      let response;
      if (id) {
        // If we are editing an existing user
        response = await axios.patch(
          `http://localhost:3000/admin/edit/${id}`,
          formData
        );
        toast.success("User updated successfully!");
      } else {
        // If we are creating a new user
        response = await axios.post(
          "http://localhost:3000/admin/create",
          formData
        );
        // console.log("response: ", response);
        toast.success("User created successfully!");
      }

      // Reset the form data on successful submission
      setFormData({
        name: "",
        region: "",
        address: "",
        phone: "",
        email: "",
        password: "",
      });

      // Optionally navigate back to the manage users page
      navigate("/manageuser"); // Adjust the navigation path as needed
    } catch (err) {
      console.error("Error saving user:", err);
      toast.error(err.response?.data?.error || "Error saving user.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const regions = ["North", "South", "East", "West"];
  return (
    <div className="AddUser">
      <div className="gnav">
        <Navbar />
      </div>
      <div className="adduserDetails">
        <div className="udhead">
          <h2>{id ? "Update User" : "Add User"}</h2>
        </div>
        <br />
        <div className="details">
          <form onSubmit={handleSubmit}>
            {/* <Autocomplete
              disablePortal
              sx={{ width: 355 }}
              // options={}
              // value={}
              // onChange={}
              renderInput={(params) => <TextField {...params} label="Region" />}
              // sx={{ width: "100%", marginBottom: "20px" }}
            /> */}
            <div>
              <Autocomplete
                disablePortal
                options={regions} // Bind the dropdown to the predefined regions
                value={formData.region} // Set the current region value
                onChange={(event, value) =>
                  setFormData({ ...formData, region: value || "" })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Region"
                    error={Boolean(formErrors.region)}
                    helperText={formErrors.region || ""}
                  />
                )}
                // sx={{ width: 355 }}
              />
            </div>
            <br />
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(formErrors.name)}
            >
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <OutlinedInput
                id="name"
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
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item md={6.5}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={Boolean(formErrors.address)}
                >
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <OutlinedInput
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    label="Address"
                    endAdornment={
                      <InputAdornment position="end" sx={{ width: "auto" }}>
                        <IconButton>
                          <LocationOn />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formErrors.address && (
                    <span className="error">{formErrors.address}</span>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={5}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={Boolean(formErrors.phone)}
                >
                  <InputLabel htmlFor="phone">Phone No.</InputLabel>
                  <OutlinedInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    label="Phone No."
                    endAdornment={
                      <InputAdornment position="end" sx={{ width: "auto" }}>
                        <IconButton>
                          <LocalPhone />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formErrors.phone && (
                    <span className="error">{formErrors.phone}</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <br /> <br />
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(formErrors.email)}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                label="Email"
                endAdornment={
                  <InputAdornment position="end" sx={{ width: "auto" }}>
                    <IconButton>
                      <Email />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formErrors.email && (
                <span className="error">{formErrors.email}</span>
              )}
            </FormControl>
            <br /> <br />
            <FormControl
              variant="outlined"
              fullWidth
              error={Boolean(formErrors.password)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                label="Password"
                endAdornment={
                  <InputAdornment position="end" sx={{ width: "auto" }}>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formErrors.password && (
                <span className="error">{formErrors.password}</span>
              )}
            </FormControl>
            <br /> <br />
            <div className="addubtn">
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? "Adding..." : id ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </div>
        <br />
      </div>
      <Toaster /> {/* This will render the toast messages */}
    </div>
  );
};

export default AddUser;
