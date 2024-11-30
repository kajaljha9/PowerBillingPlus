import Header from "./Header";
import Footer from "./Footer";
import "./MakePayment.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MakePayment = () => {
  const navigate=useNavigate()
  const bill = JSON.parse(localStorage.getItem("payment")) || {};
  const billToPay = localStorage.getItem("paymentAmount") || 100;
  console.log(bill);

  const handlePay = async () => {
    const body = {
      userId: bill.userId,
      billId: bill._id,
      paidAmount: billToPay,
    };

    try {
      let res = await axios.post(`http://localhost:3000/payment/paybill`, body);
      console.log(res);
      alert(res.data.message);
      navigate('/viewbill')
    } catch (error) {
      alert(error.response.data.error);
      console.log("error", error);
    }
  };
  return (
    <>
      <Header />

      <div className="MakePayment">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Bill Details</h2>
          </div>
          <br />
          <div>
            <p>
              <b>Bill Issue Date:</b>{" "}
              {new Date(bill.billDate).toISOString().split("T")[0]}
            </p>

            <p>
              <b>Due Date: </b>
              {new Date(bill.dueDate).toISOString().split("T")[0]}
            </p>

            <p>
              <b>Total Units used:</b> {bill.unitsUsed}{" "}
            </p>
            <p>
              <b>Bill Pending:</b> {bill.balance}
            </p>
            <p>
              <b>Amount To Pay:</b> {billToPay}
            </p>
          </div>

          <br />
          <Button
            variant="contained"
            color="success"
            sx={{ width: "auto" }}
            onClick={handlePay}
          >
            Pay now
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MakePayment;
