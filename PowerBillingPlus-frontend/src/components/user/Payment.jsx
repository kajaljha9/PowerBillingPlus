// src/components/user/Payment.jsx
import {
  Box,
  TextField,
  Button,
  Typography,
  Fade,
  Grid,
  Divider,
  InputAdornment,
  useMediaQuery
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentIcon from "@mui/icons-material/Payment";
import Header from "./UserHeader";
import Footer from "./UserFooter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Payment.css";

import pay from "../../assets/pay.png";

const Payment = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");
  const [paymentMode, setPaymentMode] = useState("card");

  const bill = JSON.parse(localStorage.getItem("payment")) || {};

  useEffect(() => {
    if (bill && bill.amount) {
      setAmount(bill.amount);
    }
  }, [bill]);

  const handleConfirmPayment = () => {
    if (!amount || Number(amount) <= 0) return toast.error("Invalid amount");

    if (paymentMode === "card") {
      const onlyDigits = /^[0-9]+$/;
      if (
        !cardNumber ||
        cardNumber.length !== 16 ||
        !onlyDigits.test(cardNumber)
      ) {
        return toast.error("Card number must be 16 digits only");
      }
      if (!cvv || cvv.length !== 3 || !onlyDigits.test(cvv)) {
        return toast.error("CVV must be 3 digits only");
      }
      if (!expiry) return toast.error("Enter valid expiry date");
      if (!holderName) return toast.error("Card holder name is required");
    }

    localStorage.setItem("paymentAmount", amount);
    navigate("/makepayment");
  };

  return (
    <>
      <Header />
      <div className="Payment">
        <Fade in timeout={600}>
          <Box className="paybox">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color="primary"
            >
              <PaymentIcon
                fontSize="large"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Secure Payment
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Please review your bill and complete payment below.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={isMobile ? 2 : 4}>
             
              <Grid item xs={12} md={6}>
                <Box className="info-box">
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <b>Bill Date:</b>
                    </Grid>
                    <Grid item xs={6}>
                      {new Date(bill.billDate).toLocaleDateString()}
                    </Grid>
                    <Grid item xs={6}>
                      <b>Due Date:</b>
                    </Grid>
                    <Grid item xs={6}>
                      {new Date(bill.dueDate).toLocaleDateString()}
                    </Grid>
                    <Grid item xs={6}>
                      <b>Units:</b>
                    </Grid>
                    <Grid item xs={6}>
                      {bill.units} kWh
                    </Grid>
                    <Grid item xs={6}>
                      <b>Total Amount:</b>
                    </Grid>
                    <Grid item xs={6}>
                      <b>₹{bill.amount}</b>
                    </Grid>
                  </Grid>
                </Box>

                {/* Image Section */}
                <Box className="payment-image-container">
                  <img
                    src={pay}
                    alt="Secure Payment"
                    className="payment-image"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box className="form-item">
                  <TextField
                    label="Amount"
                    fullWidth
                    type="number"
                    disabled
                    value={amount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>

                {paymentMode === "card" && (
                  <>
                    <Box className="form-item">
                      <TextField
                        label="Card Number"
                        fullWidth
                        inputProps={{ maxLength: 16 }}
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(e.target.value.replace(/\D/g, ""))
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCardIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    <Box className="form-item">
                      <TextField
                        label="Expiration Date"
                        type="month"
                        fullWidth
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    <Box className="form-item">
                      <TextField
                        label="CVV"
                        type="password"
                        fullWidth
                        inputProps={{ maxLength: 3 }}
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    <Box className="form-item">
                      <TextField
                        label="Card Holder Name"
                        fullWidth
                        value={holderName}
                        onChange={(e) => setHolderName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                  </>
                )}

                <div className="confirmbtn">
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleConfirmPayment}
                    fullWidth
                  >
                    Confirm Payment
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
