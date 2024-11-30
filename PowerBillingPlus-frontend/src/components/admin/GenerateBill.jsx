import Navbar from "./Navbar";
import "./GenerateBill.css";
import Button from "@mui/material/Button";
import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const GenerateBill = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [billData, setBillData] = useState({
    unitsUsed: "",
    amount: "",
    billDate: "",
    dueDate: "",
  });

  // Load user details from localStorage
  useEffect(() => {
    const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  // Handle bill generation
  const handleGenerateBill = async () => {
    try {
      const payload = {
        userId: user._id,
        ...billData,
      };
      await axios.post("http://localhost:3000/bill/generate", payload);
      toast.success("Bill generated successfully!");
      setTimeout(() => {
        navigate("/bill");
      }, 2000);
      // navigate("/bill");
    } catch (error) {
      // toast.error(error.resposne.data.error);

      console.error("Error generating bill:", error);
      toast.error("Failed to generate bill!");
    }
  };

  return (
    <div className="GenerateBill">
      <div className="gnav">
        <Navbar />
        <Toaster />
      </div>
      <div className="genDetails">
        <h2>Generate Bill</h2>

        <br />
        <Grid
          container
          gap={1}
          sx={{ display: "flex", justifyContent: "space-between " }}
        >
          <Grid item md={5.5}>
            <TextField
              disabled
              id="outlined-disabled"
              label="User"
              value={user.name || ""}
            />
          </Grid>
          <Grid item md={5.5}>
            <TextField
              disabled
              id="outlined-disabled"
              label="Phone"
              value={user.phone || ""}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          gap={1}
          sx={{ display: "flex", justifyContent: "space-between " }}
        >
          <Grid item md={5.5}>
            <TextField
              disabled
              id="outlined-disabled"
              label="Region"
              value={user.region || ""}
            />
          </Grid>

          <Grid item md={5.5}>
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              value={user.email || ""}
            />
          </Grid>
        </Grid>
        <br />
        <TextField
          disabled
          id="outlined-disabled"
          label="Address"
          value={user.address || ""}
        />

        <div className="gdetails">
          <br />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment">Units Used</InputLabel>
            <OutlinedInput
              id="outlined-adornment"
              label="Units Used"
              name="unitsUsed"
              value={billData.unitsUsed}
              onChange={handleInputChange}
            />
          </FormControl>
          <br />
          <br />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment"
              label="Bill Due"
              name="amount"
              value={billData.amount}
              onChange={handleInputChange}
            />
          </FormControl>
        </div>
        <br />
        <Grid
          container
          gap={1}
          sx={{ display: "flex", justifyContent: "space-between " }}
        >
          <Grid item md={5.5}>
            <TextField
              label="Bill Date"
              type="date"
              variant="outlined"
              name="billDate"
              value={billData.billDate}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={5.5}>
            <TextField
              label="Due Date"
              type="date"
              name="dueDate"
              value={billData.dueDate}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <br />

        <div className="calbtn">
          <Button
            variant="contained"
            onClick={() => {
              handleGenerateBill();
            }}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateBill;
