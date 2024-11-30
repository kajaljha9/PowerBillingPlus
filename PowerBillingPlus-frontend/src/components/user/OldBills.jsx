import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography } from "@mui/material";
import "./OldBills.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const token = localStorage.getItem("token") || "";
const cred = JSON.parse(localStorage.getItem("loginCred")) || {};
console.log("page =>>>", token);
const userId = cred._id;
function createData(Name, Due_Date, Amount) {
  return { Name, Due_Date, Amount };
}

const OldBills = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Correctly format the token
            }, // Properly set headers
          }
        );
        console.log("Response:", res.data); // Log the response data
        setTableData(res.data);
      } catch (error) {
        console.log(error.status);
        if (error.status == 401) {
          navigate("/login");
        }
        console.error("Error fetching user bill data:", error.message || error);
      }
    };
    fetchData();
  }, [cred, token]);
  return (
    <div
      style={
        {
          // border: "2px solid blue"
        }
      }
    >
      <Toaster />
      <Header />

      <Box
        sx={{
          // border: "2px solid red",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.6s ease-in-out",
          padding: "3rem",
          marginTop: "10px",
          width: "70vw",
          height: "85vh",
          margin: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Paid Bills
        </Typography>
        <div className="vob" style={{ marginBottom: "20px" }}>
          <Button
            sx={{
              width: "fit-content",
              backgroundColor: "#717FF5 !important",
            }}
            className="viewbtn"
            variant="contained"
            onClick={() => navigate("/viewbill")}
          >
            View New Bills
          </Button>
        </div>
        <TableContainer component={Paper} className="billtable1">
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  S.No.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  Issue Date
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  Due Date
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  Total Bill Amount
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  Bill Paid
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#1D4EA3",
                    color: "#fff",
                    width: "auto",
                  }}
                  align="center"
                >
                  Bill Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((row, index) => (
                  <TableRow key={row.username}>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {new Date(row.billDate).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {new Date(row.dueDate).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {row.amount}
                    </TableCell>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {row.balance}
                    </TableCell>
                    <TableCell sx={{ width: "auto" }} align="center">
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </div>
  );
};

export default OldBills;
