// src/components/user/MakePayment.jsx
import Header from "./UserHeader";
import Footer from "./UserFooter";
import "./MakePayment.css";
import { Button, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { payBill } from "../../api/apiService";
import toast from "react-hot-toast";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const MakePayment = () => {
  const navigate = useNavigate();
  const bill = JSON.parse(localStorage.getItem("payment")) || {};
  const billToPay = localStorage.getItem("paymentAmount") || bill.amount || 0;

  const handlePay = async () => {
    try {
      await payBill(bill._id);
      toast.success("💸 Payment successful!");
      navigate("/history");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <>
      <Header />
      <div className="MakePayment">
        <Box className="bill-preview">
          <Typography variant="h5" gutterBottom>
            🔍 Final Payment Preview
          </Typography>
          <Divider />
          <div className="preview-row">
            <span><BoltIcon /> <b>Bill Date:</b></span>
            <span>{new Date(bill.billDate).toLocaleDateString()}</span>
          </div>
          <div className="preview-row">
            <span><AccessTimeIcon /> <b>Due Date:</b></span>
            <span>{new Date(bill.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="preview-row">
            <span><b>Units Consumed:</b></span>
            <span>{bill.units} kWh</span>
          </div>
          <div className="preview-row">
            <span><CurrencyRupeeIcon /> <b>Total Amount:</b></span>
            <span>₹{bill.amount}</span>
          </div>
          <div className="preview-row">
            <span><b>Amount You Will Pay:</b></span>
            <span><strong>₹{billToPay}</strong></span>
          </div>

          <div className="pay-btn-container">
            <Button
              variant="contained"
              color="success"
              fullWidth
              startIcon={<DoneIcon />}
              onClick={handlePay}
            >
              Pay Now
            </Button>
          </div>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default MakePayment;
