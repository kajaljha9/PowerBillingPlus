//src/components/admin/ManageUser.jsx:
import "./ManageUser.css";
import {
  Autocomplete,
  Button,
  IconButton,
  TablePagination,
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

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { deleteUser, getAllUsers } from "../../api/apiService";
import AdminLayout from "./AdminLayout";

const ManageUser = () => {
  const navigate = useNavigate();
  const [nameSearch, setNameSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleEdit = (id) => {
    navigate(`/adduser/${id}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      (!regionFilter || user.region === regionFilter) &&
      (!nameSearch ||
        user.name.toLowerCase().includes(nameSearch.toLowerCase()))
  );

  //table pagination:
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="ManageUser">
        <div className="users">
          <h2>Manage Users </h2>

          <div className="user-controls">
            <div className="manageusersearch">
              <Autocomplete
                options={regions}
                value={regionFilter}
                onChange={(e, value) => setRegionFilter(value || "")}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter User by Region" />
                )}
              />
              <TextField
                label="Search by Name"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                sx={{ width: 300, marginLeft: 2 }}
              />

              <Button
                variant="outlined"
                onClick={() => {
                  setRegionFilter("");
                  setNameSearch("");
                  fetchUsers();
                }}
                sx={{ height: "50px", minWidth: "150px" }}
              >
                <RefreshOutlinedIcon />
                Refresh Users
              </Button>
            </div>

            <div className="addbtn">
              <Button variant="contained" onClick={() => navigate("/adduser")}>
                Add New User
              </Button>
            </div>
          </div>

          <div className="userdetail">
            <TableContainer component={Paper} className="userdetail">
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Region
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="left"
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4318ff",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.region}</TableCell>
                        <TableCell align="left">{user.address}</TableCell>
                        <TableCell align="left">{user.phone}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left" sx={{ display: "flex" }}>
                          <Tooltip>
                            <IconButton onClick={() => handleEdit(user._id)}>
                              <EditOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip>
                            <IconButton onClick={() => handleDelete(user._id)}>
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No users found!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredUsers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageUser;
