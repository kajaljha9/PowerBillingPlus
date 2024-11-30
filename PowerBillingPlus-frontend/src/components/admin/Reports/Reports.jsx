import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import Navbar from "../Navbar";
import "./Reports.css";
import PendingPayment from "./PendingPayment";

function createData(uid, name, address, date, amount) {
  return { uid, name, address, date, amount };
}

const rows = [
  createData(1, "xyz", "New Delhi", "26/8/2024", "Rs.500"),
  createData(2, "abc", "Jaipur", "26/8/2024", "Rs.500"),
  createData(3, "pqr", "Bangalore", "26/8/2024", "Rs.500"),
  createData(4, "def", "Gurugram", "26/8/2024", "Rs.500"),
  createData(5, "ghi", "Dwarka", "26/8/2024", "Rs.500"),
  createData(6, "jkl", "Noida", "26/8/2024", "Rs.500"),
  createData(7, "mno", "Old", "26/8/2024", "Rs.500")
];

const Reports = () => {
  return (
    <div className="Reports" >
      <div className="renav">
        <Navbar />
      </div>

      <div className="paydetails">
        <div className="paydetails1">
          <div className="paydhead">
            <Typography variant="h5" align="center">
              Payment Details
            </Typography>
          </div>
          <div className="paydetailtable">
            <TableContainer component={Paper} className="paytable">
              <Table stickyHeader aria-label="payment table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#1D4EA3", color: "#fff", width:"auto" }}
                      align="center"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#1D4EA3", color: "#fff" , width:"auto"}}
                      align="center"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#1D4EA3", color: "#fff" , width:"auto"}}
                      align="center"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#1D4EA3", color: "#fff" , width:"auto"}}
                      align="center"
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell sx={{width:"auto"}} align="center">{row.name}</TableCell>
                      <TableCell sx={{width:"auto"}} align="center">{row.address}</TableCell>
                      <TableCell sx={{width:"auto"}} align="center">{row.date}</TableCell>
                      <TableCell sx={{width:"auto"}} align="center">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="ppdiv">
          <PendingPayment />
        </div>
      </div>
    </div>
  );
};

export default Reports;
