import {

  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Navbar from "./Navbar";
import "./Bill.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Bill = () => {
  const [bills, setBills] = useState([]);

  // Fetch bills from the backend
  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bill/allbills");
      if (response.data.success) {
        setBills(response.data.bills); // Set fetched bills in state
      } else {
        toast.error("Failed to fetch bills");
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Error fetching bills");
    }
  };

  useEffect(() => {
    fetchBills(); // Fetch bills when the component mounts
  }, []);
  return (
    <div className="Bill">
      <div className="gnav">
        <Navbar />
      </div>

      <div className="billtable">
        <div className="tbody">
          
          <div className="udetail">
            <h2>All Bills</h2>
          </div>
          <br />
          <div className="usertable">
            <TableContainer component={Paper} className="billcontainer">
              <Table
                stickyHeader
                sx={{ minWidth: 550, tableLayout: "auto" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      User
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
                      Phone
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Region
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Units
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      BillDate
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      DueDate
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1D4EA3",
                        color: "#fff",
                        width: "auto"
                      }}
                      align="center"
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tablebody">
                  {bills.length > 0 ? (
                    bills.map((bill) => (
                      <TableRow key={bill._id}>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.userId?.name || "N/A"}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.userId?.email || "N/A"}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.userId?.phone || "N/A"}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.userId?.region || "N/A"}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.unitsUsed}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.amount}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {new Date(bill.billDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {new Date(bill.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ width: "auto" }} align="center">
                          {bill.status || "Unpaid"}
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
            </TableContainer>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Bill;
