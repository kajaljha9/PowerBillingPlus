// src/components/admin/GenerateBill.jsx:
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getAllBills, updateBill } from "../../api/apiService";
import toast, { Toaster } from "react-hot-toast";
import { generateBill, getAllUsers } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "./GenerateBill.css";

const GenerateBill = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    units: "",
    amount: "",
    month: "",
    billDate: "",
    dueDate: ""
  });

  const navigate = useNavigate();

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editBillId = params.get("id");

  const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 4 = May
  const filteredMonths = months.slice(0, currentMonthIndex + 1); // Prevent future months

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

  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch {
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = regionFilter
    ? users.filter((u) => u.region === regionFilter)
    : users;

  useEffect(() => {
    const today = getTodayDate();
    const nextMonth = getNextMonthDate(today);

    setFormData((prev) => ({
      ...prev,
      billDate: today,
      dueDate: nextMonth
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAmount = (units) => {
    const slabs = [
      { limit: 100, rate: 3 },
      { limit: 100, rate: 5 },
      { limit: Infinity, rate: 8 }
    ];
    let remaining = units;
    let amount = 0;

    for (let slab of slabs) {
      const usage = Math.min(remaining, slab.limit);
      amount += usage * slab.rate;
      remaining -= usage;
      if (remaining <= 0) break;
    }

    return amount;
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getNextMonthDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleUnitsChange = (e) => {
    const units = e.target.value;
    const amount = calculateAmount(Number(units));
    const billDate = getTodayDate();
    const dueDate = getNextMonthDate(billDate);
    setFormData((prev) => ({
      ...prev,
      units,
      amount,
      billDate,
      dueDate
    }));
  };

  const handleUserSelect = (e) => {
    const id = e.target.value;
    const user = users.find((u) => u._id === id);
    setSelectedUser(user);
    setFormData({ ...formData, userId: id });
  };

  const handleSubmit = async () => {
    const { userId, units, amount, month, billDate, dueDate } = formData;
    if (!userId || !units || !amount || !month || !billDate || !dueDate) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editBillId) {
        await updateBill(editBillId, formData);
        toast.success("Bill updated");
      } else {
        await generateBill(formData);
        toast.success("Bill generated");
      }
      setTimeout(() => navigate("/managebill"), 1500);
    } catch (err) {
      if (err.response?.status === 400 && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to save bill");
      }
    }
  };

  useEffect(() => {
    const fetchBillToEdit = async () => {
      if (editBillId) {
        try {
          const res = await getAllBills(); // you may prefer an API like `getBillById`
          const billToEdit = res.data.find((b) => b._id === editBillId);
          if (billToEdit) {
            setFormData({
              userId: billToEdit.user._id,
              units: billToEdit.units,
              amount: billToEdit.amount,
              month: billToEdit.month,
              billDate: billToEdit.billDate.split("T")[0],
              dueDate: billToEdit.dueDate.split("T")[0]
            });
            setSelectedUser(billToEdit.user);
          }
        } catch (err) {
          toast.error("Failed to load bill for editing");
        }
      }
    };

    fetchBillToEdit();
  }, [editBillId]);

  const handleClear = () => {
    const today = getTodayDate();
    const due = getNextMonthDate(today);

    setFormData({
      userId: "",
      units: "",
      amount: "",
      month: "",
      billDate: today,
      dueDate: due
    });
    setSelectedUser(null);
    setRegionFilter("");
  };

  return (
    <AdminLayout>
      <div className="genDetails">
        <Toaster />
        <h2>Generate Bill</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={["", ...regions]}
              value={regionFilter}
              onChange={(event, newValue) => setRegionFilter(newValue || "")}
              getOptionLabel={(option) => option || "All"}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Region" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={filteredUsers}
              getOptionLabel={(option) =>
                option?.name && option?.meterId
                  ? `${option.name} (${option.meterId})`
                  : ""
              }
              value={users.find((user) => user._id === formData.userId) || null}
              onChange={(event, newValue) =>
                handleUserSelect({ target: { value: newValue?._id || "" } })
              }
              renderInput={(params) => (
                <TextField {...params} label="Select User" />
              )}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              clearOnEscape
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={filteredMonths}
              value={formData.month}
              onChange={(event, newValue) =>
                handleChange({
                  target: { name: "month", value: newValue || "" }
                })
              }
              renderInput={(params) => <TextField {...params} label="Month" />}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
            />
          </Grid>

          {selectedUser && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  value={selectedUser.phone}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Region"
                  value={selectedUser.region}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={selectedUser.email}
                  disabled
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6}>
            <TextField
              label="Units Consumed"
              name="units"
              type="number"
              value={formData.units}
              onChange={handleUnitsChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Amount (₹)"
              name="amount"
              type="number"
              value={formData.amount}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Bill Date"
              name="billDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.billDate}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dueDate}
              fullWidth
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Generate Bill
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    </AdminLayout>
  );
};

export default GenerateBill;
