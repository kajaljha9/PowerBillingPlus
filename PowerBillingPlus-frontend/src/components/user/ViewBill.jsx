// src/components/user/ViewBill.jsx

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./ViewBill.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUnpaidBills } from "../../api/apiService";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const ViewBill = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cred = JSON.parse(localStorage.getItem("loginCred"));
  const userId = cred?._id;

  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchBills = async () => {
      try {
        const res = await getUnpaidBills(userId);
        setBills(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchBills();
  }, [token, userId, navigate]);

  const handlePayment = (bill) => {
    localStorage.setItem("payment", JSON.stringify(bill));
    navigate("/payment");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBills = bills.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      <Header />
      <div className="ViewBill">
        <div className="billhead">
          <Typography variant="h4" align="center">
            Your Unpaid Bills
          </Typography>
        </div>
        <div className="vob">
          <Button
            className="viewbtn"
            variant="contained"
            onClick={() => navigate("/history")}
          >
            View Paid Bills
          </Button>
        </div>
        <br />
        <TableContainer component={Paper} className="billtable1">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "S.No",
                  "Issue Date",
                  "Due Date",
                  "Units",
                  "Amount",
                  "Status",
                  "Action"
                ].map((head, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    sx={{ backgroundColor: "#4318ff", color: "#fff" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBills?.length > 0 ? (
                paginatedBills.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {new Date(row.billDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{row.units}</TableCell>
                    <TableCell align="center">₹{row.amount}</TableCell>
                    {/* <TableCell align="center">{row.status}</TableCell> */}
                    <TableCell align="center">
                      {row.status === "UNPAID" ? (
                        <Typography variant="body2" color="error">
                          {row.status}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="success.main">
                          {row.status}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        className="btn2"
                        variant="contained"
                        onClick={() => handlePayment(row)}
                        startIcon={<CurrencyRupeeIcon />}
                      >
                        Pay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No unpaid bills found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={bills.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </TableContainer>
      </div>
      <Footer />
    </>
  );
};

export default ViewBill;
