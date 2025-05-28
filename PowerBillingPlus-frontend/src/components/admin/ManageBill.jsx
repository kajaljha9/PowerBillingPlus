// src/components/admin/ManageBill.jsx:
import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Paper,
  Box,
  Autocomplete,
  TablePagination,
  useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllBills,
  deleteBill,
  updateBillStatus,
  getAllUsers
} from "../../api/apiService";
import toast, { Toaster } from "react-hot-toast";
import "./ManageBill.css";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { ReceiptLongOutlined } from "@mui/icons-material";
import AdminLayout from "./AdminLayout";

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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const ManageBill = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bills, setBills] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [nameSearch, setNameSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchBills();
  }, [regionFilter, monthFilter]);

  const fetchBills = async (region = regionFilter, month = monthFilter) => {
    try {
      const res = await getAllBills({ region, month });
      setBills(res.data);
    } catch (err) {
      toast.error("Failed to fetch bills");
    }
  };

  const filteredBills = bills.filter(
    (bill) =>
      !nameSearch ||
      bill.user?.name?.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (!regionFilter || user.region === regionFilter) &&
      (!nameSearch ||
        user.name.toLowerCase().includes(nameSearch.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    try {
      await deleteBill(id);
      toast.success("Bill deleted successfully");
      fetchBills();
    } catch (err) {
      toast.error("Failed to delete bill");
    }
  };

  const handleStatusChange = async (billId, newStatus) => {
    try {
      await updateBillStatus(billId, { status: newStatus });
      toast.success("Status updated");
      fetchBills();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleGenerateBill = () => {
    navigate("/generatebill");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const paginatedBills = filteredBills.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="ManageBill">
        <div className="users">
          <h2>Manage Bills</h2>

          <div className="filters">
            <Box sx={{ minWidth: 160 }}>
              <Autocomplete
                options={["", ...regions]}
                value={regionFilter}
                onChange={(event, newValue) => setRegionFilter(newValue)}
                getOptionLabel={(option) => option || "All"}
                renderInput={(params) => (
                  <TextField {...params} label="Region" />
                )}
              />
            </Box>
            <Box sx={{ minWidth: 170 }}>
              <Autocomplete
                options={["", ...months]}
                value={monthFilter}
                onChange={(event, newValue) => setMonthFilter(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Month" />
                )}
                getOptionLabel={(option) => option || "All"}
              />
            </Box>
            <Box sx={{ minWidth: 150 }}>
              <TextField
                label="Search by Name"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                sx={{ width: 200, marginLeft: 2 }}
              />
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshOutlinedIcon />}
              onClick={() => {
                setRegionFilter("");
                setMonthFilter("");
                setNameSearch("");
                fetchBills("", ""); // explicitly pass empty strings
              }}
              sx={{ height: "50px" }}
            >
              Refresh
            </Button>

            <div className="addbtn">
              <Button
                variant="contained"
                startIcon={<ReceiptLongOutlined />}
                onClick={handleGenerateBill}
                sx={{ height: "55px" }}
              >
                Generate New Bill
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Units</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Bill Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedBills.length > 0 ? (
                  paginatedBills.map((bill) => (
                    <TableRow key={bill._id}>
                      <TableCell>{bill.user?.name}</TableCell>
                      <TableCell>{bill.user?.region}</TableCell>
                      <TableCell>{bill.month}</TableCell>
                      <TableCell>{bill.units}</TableCell>
                      <TableCell>₹{bill.amount}</TableCell>
                      <TableCell>
                        {new Date(bill.billDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(bill.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={bill.status}
                          size="small"
                          disabled={bill.status === "Paid"}
                          onChange={(e) =>
                            handleStatusChange(bill._id, e.target.value)
                          }
                        >
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Unpaid">Unpaid</MenuItem>
                        </Select>
                      </TableCell>
                      
                      <TableCell sx={{ display: "flex" }}>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() =>
                              navigate(`/generatebill?id=${bill._id}`)
                            }
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(bill._id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No bills found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={filteredBills.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </TableContainer>
          <Toaster />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageBill;
