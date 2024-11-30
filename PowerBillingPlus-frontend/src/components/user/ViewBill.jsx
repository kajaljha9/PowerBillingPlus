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
  TableRow,
  Typography,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function createData(Name, DueDate, Amount) {
  return { Name, DueDate, Amount };
}

const token = localStorage.getItem("token") || "";
const cred = JSON.parse(localStorage.getItem("loginCred")) || {};
console.log("view page ", token);
const userId = cred._id;

const ViewBill = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    console.log("ënterrrrrrrrrr");
console.log("view page ", token);

    if (!token) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/userbill/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Correctly format the token
            }, // Properly set headers
          }
        );
        // console.log("Response:", res.data); // Log the response data
        setTableData(res.data);
      } catch (error) {
        console.log(error);
        if (error.status == 401) {
          navigate("/login");
        }
        console.error("Error fetching user bill data:", error.message || error);
      }
    };
    fetchData();
  }, [cred,navigate, token]);

  const handlePayment = (body) => {
    // console.log("body", body);
    localStorage.setItem("payment", JSON.stringify(body));
    navigate("/payment", { replace: true });
  };

  return (
    <>
      <Header />
      <div className="ViewBill">
        <div className="billhead">
          <Typography variant="h4" align="center">
            Your New Bills List
          </Typography>
        </div>
        {/* {console.log("tableData", tableData)} */}
        <div className="vob">
          <Button
            sx={{
              width: "fit-content",
              backgroundColor: "#717FF5 !important",
            }}
            className="viewbtn"
            variant="contained"
            onClick={() => navigate("/history")}
          >
           View Paid Bills
          </Button>
        </div>
        <br />
        <div className="billtable">
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
                  <TableCell
                    sx={{
                      backgroundColor: "#1D4EA3",
                      color: "#fff",
                      width: "auto",
                    }}
                    align="center"
                  >
                    Payment
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
                      {row.status !== "Paid" && (
                        <TableCell sx={{ width: "auto" }} align="center">
                          <Button
                            sx={{
                              width: "150px !important",
                              borderRadius: "10px",
                            }}
                            className="btn2"
                            variant="contained"
                            onClick={() => handlePayment(row)}
                          >
                            Make Payment
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewBill;
