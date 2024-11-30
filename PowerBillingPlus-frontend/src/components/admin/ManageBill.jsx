import Navbar from "./Navbar";
import "./ManageBill.css";
import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const ManageBill = () => {
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

  return (
    <div className="ManageUser">
      <div className="gnav">
        <Navbar />
      </div>

      <div className="users">
        <h2>Generate Bill</h2>
        <br />
        <div
          className="manageusersearch"
          style={{
            // border: "2px solid red",
            display: "flex",
            gap: "2rem",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {/*  */}
          <Autocomplete
            sx={{ width: 250 }}
            disablePortal
            options={regions} // Bind the dropdown to the predefined regions
            value={region.region} // Set the current region value
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
            // options={}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Username" />}
          />
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              height: "2.7rem",
              backgroundColor: "#4318ff",
              color: "#fff"
            }}
          >
            Search
          </Button>

          {/*  */}
        </div>
        <br />
        <hr />
        <br />
        <div className="udtablebody">
          <div
            style={{
             
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <div className="udetail" >
              <h2>Users</h2>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div >
              <Button
                sx={{ width: "auto" }}
                variant="contained"
                onClick={() => {
                  navigate("/bill");
                }}
              >
                Previous Bills
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
                        width: "auto"
                      }}
                      align="left"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Region
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      PhoneNo
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      GenerateBill
                    </TableCell>
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

                        <TableCell sx={{ width: "auto" }} align="center">
                          {/* <Tooltip sx={{ width: "auto", marginRight: "0px" }}>
                            <IconButton
                              onClick={() => navigate("/generatebill")}
                            >
                              <ReceiptLongOutlinedIcon />
                            </IconButton>
                          </Tooltip> */}
                          <Tooltip>
                            <IconButton
                              onClick={() => {
                                localStorage.setItem(
                                  "selectedUser",
                                  JSON.stringify(user)
                                );
                                navigate("/generatebill");
                              }}
                            >
                              <ReceiptLongOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
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
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ManageBill;
