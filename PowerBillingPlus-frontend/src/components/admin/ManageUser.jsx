import Navbar from "./Navbar";
import "./ManageUser.css";
import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const ManageUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const regions = ["North", "South", "East", "West"];
  const [region, setRegion] = useState({ region: "" });
  const [formErrors, setFormErrors] = useState({}); // To store validation errors

  // Fetch the users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/get");
      console.log("Fetched users: ", response.data);
      setUsers(response.data.users); // Set the state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users!");
    }
  };

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/delete/${id}`
      );
      toast.success(response.data.message); // Show success message
      setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    }
  };

  // Search filter for users
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Navigate to the Add/Edit user page
  const handleEdit = (userId) => {
    navigate(`/adduser/${userId}`); // Navigate to the AddUser page with the user ID
  };

  return (
    <div className="ManageUser">
      <div className="gnav">
        <Navbar />
      </div>
      <div className="users">
        <h2>Manage Users </h2>
        <br />
        {/* <div
          className="manageusersearch"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }} >
          <Autocomplete
            sx={{ width: 250 }}
            disablePortal
            options={regions}
            value={region.region}
            onChange={(event, value) =>
              setRegion({ ...region, region: value || "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Region"
                error={Boolean(formErrors.region)}
                helperText={formErrors.region || ""}
              />
            )}
          />
          <Autocomplete
            disablePortal
          
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              height: "2.7rem",
              backgroundColor: "#4318ff",
              color: "#fff",
            }}
          >
            Search
          </Button>
        </div> */}

        <hr />

        <div className="udtablebody">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="udetail"
              style={{ display: "flex", width: "14rem" }}
            >
              <h2>User Details</h2>
              {/* <RefreshOutlinedIcon onClick={fetchUsers} /> */}
            </div>
            <div className="addbtn">
              <Button variant="contained" onClick={() => navigate("/adduser")}>
                Add User
              </Button>
            </div>
          </div>
          <br />
          <div className="userdetail">
            <TableContainer component={Paper} className="userdetail">
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="left"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="left"
                    >
                      Region
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="left"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="left"
                    >
                      PhoneNo
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto",
                      }}
                      align="center"
                    >
                      Action
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      GenerateBill
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell sx={{ width: "auto" }} align="left">
                          {user.name}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="left">
                          {user.region}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="left">
                          {user.address}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="left">
                          {user.phone}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="left">
                          {user.email}
                        </TableCell>
                        <TableCell
                          sx={{ width: "auto", display: "flex" }}
                          align="left"
                        >
                          <Tooltip sx={{ width: "auto", marginRight: "0px" }}>
                            <IconButton onClick={() => handleEdit(user._id)}>
                              <EditOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip sx={{ width: "auto", marginRight: "0px" }}>
                            <IconButton onClick={() => handleDelete(user._id)}>
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        {/* <TableCell sx={{ width: "auto" }} align="left">
                          <Tooltip sx={{ width: "auto", marginRight: "0px" }}>
                            <IconButton
                              onClick={() => navigate("/generatebill")}
                            >
                              <ReceiptLongOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            {/* <Button
              sx={{
                width: "auto",
                backgroundColor: "#4318ff",
                color: "#fff"
              }}
              variant="contained"
              onClick={fetchUsers} // Refresh users
            >
              Refresh Users
            </Button> */}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
