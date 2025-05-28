//src/components/user/OldBills.jsx

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import { Box, TablePagination, Typography } from "@mui/material";
import "./OldBills.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getPaidBills } from "../../api/apiService";

const OldBills = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cred = JSON.parse(localStorage.getItem("loginCred"));
  const userId = cred?._id;

  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchPaidBills = async () => {
      try {
        const res = await getPaidBills(userId);
        setBills(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch paid bills");
        navigate("/login");
      }
    };

    fetchPaidBills();
  }, [token, userId, navigate]);

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
      <Toaster />
      <Header />
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.6s ease-in-out",
          padding: "3rem",
          width: "90%",
          margin: " 20px auto "
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Paid Bills
        </Typography>

        <Box
          sx={{ textAlign: "right", marginBottom: 2, width: "auto !important" }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/viewbill")}
            sx={{ backgroundColor: "#4318ff", width: "auto" }}
          >
            View New Bills
          </Button>
        </Box>

        <TableContainer component={Paper}>
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
                  "Txn ID",
                  "Paid At"
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
              {paginatedBills.length > 0 ? (
                paginatedBills.map((bill, index) => (
                  <TableRow key={bill._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {new Date(bill.billDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(bill.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{bill.units}</TableCell>
                    <TableCell align="center">₹{bill.amount}</TableCell>
                    {/* <TableCell align="center">{bill.status}</TableCell> */}
                    <TableCell align="center">
                      <CheckCircleIcon style={{ color: "#4caf50" }} />
                      <Typography variant="body2" color="textSecondary">
                        {bill.status}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      {bill.paymentInfo?.txnId || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {bill.paymentInfo?.paidAt
                        ? new Date(bill.paymentInfo.paidAt).toLocaleString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No paid bills found.
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
      </Box>
      <Footer />
    </>
  );
};

export default OldBills;
