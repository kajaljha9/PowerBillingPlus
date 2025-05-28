// src/components/admin/Dashboard/Dashboard.jsx

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  getDashboardMetrics,
  getRevenueData,
  getUserPaymentStatusData,
  getUnitsComparisonData
} from "../../../api/apiService";
import AdminLayout from "../AdminLayout";
import "./Dashboard.css";

// Constants
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

const Dashboard = () => {
  // Default values
  const currentYear = new Date().getFullYear();
  const lastMonth =
    new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1;

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState(lastMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Dashboard data states
  const [metrics, setMetrics] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [userStatus, setUserStatus] = useState({});
  const [unitsData, setUnitsData] = useState({});

  // Fetch data with filters
  const fetchData = async (
    month = selectedMonth,
    year = selectedYear,
    region = selectedRegion
  ) => {
    try {
      const filters = {
        month,
        year,
        ...(region !== "All" && { region })
      };

      const [metricsRes, revenueRes, statusRes, unitsRes] = await Promise.all([
        getDashboardMetrics(filters),
        getRevenueData({ year, ...(region !== "All" && { region }) }),
        getUserPaymentStatusData(filters),
        getUnitsComparisonData(filters)
      ]);

      setMetrics(metricsRes.data);
      setRevenueData(
        revenueRes.data.map((amt, idx) => ({
          month: months[idx],
          amount: amt
        }))
      );
      setUserStatus(statusRes.data);
      setUnitsData(unitsRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  // Load on first render and when filters change
  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, selectedRegion]);

  const resetFilters = () => {
    setSelectedMonth(lastMonth);
    setSelectedYear(currentYear);
    setSelectedRegion("All");
    fetchData(lastMonth, currentYear, "All");
  };

  if (!metrics) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <Typography variant="h4" className="page-header">
          📊 Admin Dashboard
        </Typography>

        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            size="small"
          >
            {months.map((m, i) => (
              <MenuItem value={i} key={i}>
                {m}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            size="small"
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
              <MenuItem value={y} key={y}>
                {y}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            size="small"
          >
            <MenuItem value="All">All Regions</MenuItem>
            {regions.map((r) => (
              <MenuItem value={r} key={r}>
                {r}
              </MenuItem>
            ))}
          </Select>

          <Button
            onClick={resetFilters}
            variant="outlined"
            sx={{ backgroundColor: "white" }}
          >
            🔄 Refresh
          </Button>
        </Box>

        {/* Filter description */}
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Showing data for:{" "}
          <strong>
            {months[selectedMonth]} {selectedYear}
          </strong>{" "}
          {selectedRegion !== "All" ? `in ${selectedRegion}` : "in All Regions"}
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} className="dashboard-cards">
          <DashboardCard
            title="Total Users"
            value={metrics.totalUsers}
            bg="#0088FE"
          />
          <DashboardCard
            title="Revenue (₹)"
            value={metrics.totalRevenue}
            bg="#00C49F"
          />
          <DashboardCard
            title="Paid Bills"
            value={metrics.paidBills}
            bg="#2ECC71"
          />
          <DashboardCard
            title="Unpaid Bills"
            value={metrics.unpaidBills}
            bg="#E74C3C"
          />
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} className="dashboard-charts">
          <Grid item xs={12} md={6}>
            <Paper className="admin-chart">
              <Typography variant="h6" gutterBottom>
                Monthly Revenue
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#4318ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="admin-chart">
              <Typography variant="h6" gutterBottom>
                User Payment Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Paid", value: userStatus.paid },
                      { name: "Unpaid", value: userStatus.unpaid }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FF8042" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className="admin-chart">
              <Typography variant="h6" gutterBottom>
                Units Comparison (Paid vs Unpaid)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Paid", units: unitsData.unitsPaidFor },
                    { name: "Unpaid", units: unitsData.unitsPending }
                  ]}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="units" fill="#8884d8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </AdminLayout>
  );
};

// Summary card component
const DashboardCard = ({ title, value, bg }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Paper
      sx={{
        p: 3,
        backgroundColor: bg,
        color: "#fff",
        borderRadius: "12px",
        textAlign: "center",
        minHeight: 100
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
        {value}
      </Typography>
    </Paper>
  </Grid>
);

export default Dashboard;
