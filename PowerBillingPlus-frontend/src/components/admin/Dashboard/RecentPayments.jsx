import React from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Paper,
  Divider
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

// Example data for payments
const paymentData = [
  {
    id: 1,
    name: "Mithlesh K. Singh",
    amount: "Rs. 3000",
    time: "30s ago",
    avatarColor: deepPurple[500]
  },
  {
    id: 2,
    name: "Suron Maharjan",
    amount: "Rs. 800",
    time: "58s ago",
    avatarColor: "#00C6FF"
  },
  {
    id: 3,
    name: "Sandesh Bajracharya",
    amount: "Rs. 5500",
    time: "1m ago",
    avatarColor: "#FFA500"
  },
  {
    id: 4,
    name: "Subin Sedhai",
    amount: "Rs. 2500",
    time: "1m ago",
    avatarColor: "#4CAF50"
  }
];

const RecentPayments = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: "10px" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Recent Payments
        </Typography>
        <Button variant="text" sx={{ color: "#6200EA", fontWeight: "bold" }}>
          See All
        </Button>
      </Box>

      {/* Payments List */}
      <List sx={{ mt: 2 }}>
        {paymentData.map((payment) => (
          <React.Fragment key={payment.id}>
            <ListItem sx={{ p: 2 }}>
              {/* Avatar */}
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: payment.avatarColor, width: 56, height: 56 }}
                />
              </ListItemAvatar>
              {/* Payment Details */}
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {payment.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {payment.amount}
                  </Typography>
                }
              />
              {/* Payment Icon Placeholder */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: 2
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: "#3A3A3A"
                  }}
                />
              </Box>
              {/* Time Ago */}
              <Typography variant="caption" color="textSecondary">
                {payment.time}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentPayments;
