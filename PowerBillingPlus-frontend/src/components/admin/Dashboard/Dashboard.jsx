import { Box, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../Navbar";
import "./Dashboard.css";
import Track from "./Track";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUnits: 0,
    totalFare: 0,
    totalPending: 0,
    paidBillsCount: 0,
    totalPaidAmount: 0,
    totalPendingBills: 0,
  });
  const cards = [
    {
      title: stats.totalUsers,
      value: "Total Users",
      bgColor: "#6a67ce", //purple
      // icon: "👤"
      // icon:<PersonOutlineOutlinedIcon/>
    },
    {
      title: stats.totalFare,
      value: "Total Amount",
      bgColor: "#34c759", // Green
    },
    {
      title: stats.totalPaidAmount,
      value: "Total Paid",
      bgColor: "#007aff", // Blue
    },
    {
      title: stats.totalPending,
      value: "Total Due Amount",
      bgColor: "#34c759", // green
    },
    {
      title: stats.totalUnits,
      value: "Total Units Generated",
      bgColor: "#007aff", // Blue
    },
    {
      title: stats.totalBills,
      value: "Total Bills",
      bgColor: "#34c759", // Green
    },
    {
      title: stats.totalPendingBills,
      value: "Total Bill Pending",
      bgColor: "#007aff", // Blue
    },

    {
      title: stats.paidBillsCount,
      value: "Paid Bill Count",
      bgColor: "#6a67ce", // purple
    },
  ];

  useEffect(
    () => async () => {
      try {
        let res = await axios.get(`http://localhost:3000/admin/dashboard`);
        console.log(res.data);
        setStats(res.data);
        setAnalyticsData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    []
  );
  return (
    <div className="Dashboard">
      <div className="gnav">
        <Navbar />
      </div>
      <div>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "0px",
          }}
        >
          <h2 style={{ marginBottom: "40px",marginLeft:"10px" }}>Admin Dashboard Analytics</h2>
          <hr />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Ensures even spacing between cards
              alignItems: "center",
              gap: 2, // Space between cards
              padding: 2,
              mt: "30px",
              flexWrap: "wrap", // Ensures responsive wrapping if the screen is too narrow
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: card.bgColor,
                  color: "#fff",
                  width: "250px", // Ensures consistent width
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  {card.icon && (
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "40px", marginBottom: "10px" }}
                    >
                      {card.icon}
                    </Typography>
                  )}
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {card.value}
                  </Typography>
                  <Typography variant="subtitle1">{card.title}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </div>

        {/* <div className="dashtrack">
          <Track />
        </div> */}
        <Chart analyticsData={analyticsData} />
      </div>
    </div>
  );
};

export default Dashboard;
