import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography
} from "@mui/material";
import "./PendingPayment.css";
import ReportImage from "./../../../assets/report.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function createData(name, email, phoneno, amount) {
  return { name, email, phoneno, amount };
}

const rows = [
  createData("Alice", "alice@gmail.com", "1234567890", 2000),
  createData("Bob", "bob@gmail.com", "0987654321", 1500),
  createData("Charlie", "charlie@gmail.com", "2345678901", 2500),
  createData("David", "david@gmail.com", "3456789012", 3000),
  createData("Eve", "eve@gmail.com", "4567890123", 1800),
  createData("Frank", "frank@gmail.com", "5678901234", 2200),
  createData("Grace", "grace@gmail.com", "6789012345", 2700),
  createData("Heidi", "heidi@gmail.com", "7890123456", 3200),
  createData("Ivan", "ivan@gmail.com", "8901234567", 1900),
  createData("Judy", "judy@gmail.com", "9012345678", 2100)
];

const PendingPayment = () => {
  return (
    <div className="PendingPayment">
      <div className="pendingtablediv">
        {/* <div className="pp">
            <h4>Pending Payments</h4>
          </div> */}
        <div className="pp">
          <Typography variant="h6" align="center">
            Pending Payments
          </Typography>
        </div>
        <TableContainer component={Paper} className="pendingtable">
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#1D4EA3", color: "#fff" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1D4EA3", color: "#fff" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1D4EA3", color: "#fff" }}
                  align="center"
                >
                  PhoneNo.
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1D4EA3", color: "#fff" }}
                  align="center"
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.phoneno}</StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="repimg">
        <img src={ReportImage} alt="app_img" />
      </div>
    </div>
  );
};

export default PendingPayment;
