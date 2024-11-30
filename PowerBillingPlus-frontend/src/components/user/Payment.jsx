import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Payment.css";
import Image from "../../assets/IMAGE.svg";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState(""); // State to store the amount
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    // Store the amount in localStorage
    localStorage.setItem("paymentAmount", amount);
    // Navigate to the next page
    navigate("/makepayment");
  };

  return (
    <>
      <Header />
      <div className="Payment">
        <div className="paybox">
          <div className="b1">
            <Typography variant="h4" align="center">
              Credit/Debit Card Payment
            </Typography>
          </div>
          <div className="b2" style={{ padding: "0rem 1rem" }}>
            <div></div>
            <div>
              <h4>Payment Details</h4>
            </div>
            <div className="paymentimg">
              <img style={{ width: "100px" }} src={Image} alt="img" />
            </div>
            <div></div>
          </div>

          <div
            className="b3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* Amount TextField */}
            <Box sx={{ width: "100%", maxWidth: 400, marginBottom: 1 }}>
              <TextField
                fullWidth
                label="Amount"
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update state when the value changes
                InputProps={{
                  startAdornment: <span>₹</span>
                }}
              />
            </Box>

            {/* Card Number TextField */}
            <Box sx={{ width: "100%", maxWidth: 400, marginBottom: 1 }}>
              <TextField fullWidth label="Card Number" id="card-number" />
            </Box>

            {/* Expiration Date TextField */}
            <Box sx={{ width: "100%", maxWidth: 400, marginBottom: 1 }}>
              <TextField
                label="Expiration Date"
                type="date"
                variant="outlined"
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>

            {/* CVV TextField */}
            <Box sx={{ width: "100%", maxWidth: 400, marginBottom: 1 }}>
              <TextField fullWidth label="CVV" id="cvv" />
            </Box>

            {/* Card Holder Name TextField */}
            <Box sx={{ width: "100%", maxWidth: 400, marginBottom: 1 }}>
              <TextField fullWidth label="Card Holder Name" id="card-holder" />
            </Box>

            {/* Confirm Payment Button */}
            <div className="confirmbtn">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#32CD32", width: "auto" }}
                onClick={handleConfirmPayment} // Trigger handleConfirmPayment when the button is clicked
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;


// import Footer from "./Footer";
// import Header from "./Header";
// import "./Payment.css";

// import  { useState } from "react";

// const Payment = () => {
//   const [card, setCard] = useState({
//     cardno: "",
//     cardtype: "far fa-credit-card",
//     expirydt: ""
//   });

//   const onChange = (e) => {
//     var cartype_new = cardnumber(e.target.value);
//     setCard({
//       ...card,
//       cardno: e.target.value,
//       cardtype: cartype_new
//     });
//   };
//   const cardnumber = (inputtxt) => {
//     var matches = inputtxt.match(/(\d+)/);
//     var cardno = "";
//     console.log(matches);
//     if (matches) {
//       cardno = inputtxt.split(" - ").join("");
//     }
//     console.log(cardno);
//     var cardtype1 = card.cardtype;
//     //var visa = /^(?:4[0-9]{16}(?:[0-9]{3})?)$/;
//     var visa = /^(?:4[0-9]{2}?)$/;
//     var mastercardRegEx = /^(?:5[1-5][0-9]{3})$/;
//     var amexpRegEx = /^(?:3[47][0-9]{3})$/;
//     var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{5})$/;
//     console.log(visa.test(cardno));
//     if (visa.test(cardno) === true) {
//       //eg:4651970022334445
//       cardtype1 = "far fa fa-3x fa-cc-visa  carddetail-cardtype";
//     } else if (mastercardRegEx.test(cardno) === true) {
//       cardtype1 = "far fa fa-3x fa-cc-mastercard carddetail-cardtype";
//     } else if (amexpRegEx.test(cardno) === true) {
//       cardtype1 = "far fa fa-3x fa-cc-amex carddetail-cardtype";
//     } else if (discovRegEx.test(cardno) === true) {
//       cardtype1 = "far fa fa-3x fa-cc-discover carddetail-cardtype";
//     }
//     return cardtype1;
//   };

//   const cc_format = (value) => {
//     const v = value.replace(/[^0-9]/gi, "").substr(0, 16);

//     const parts = [];
//     for (let i = 0; i < v.length; i += 4) {
//       parts.push(v.substr(i, 4));
//     }
//     return parts.length > 1 ? parts.join(" - ") : value;
//   };
//   const expriy_format = (value) => {
//     const expdate = value;
//     const expDateFormatter =
//       expdate.replace(/\//g, "").substring(0, 2) +
//       (expdate.length > 2 ? "/" : "") +
//       expdate.replace(/\//g, "").substring(2, 4);

//     return expDateFormatter;
//   };
//   const onChangeExp = (e) => {
//     setCard({
//       ...card,
//       expirydt: e.target.value
//     });
//   };

//   return (
//     <>
//       <Header />
//       <div className="cardetails-payment">
//         <h2 className="carddetails-head">Card Details</h2>

//         <div className="cardetails-form">
//           <div className="cardetails-card cardetails-space cardetails-icon-relative">
//             <label className="cardetails-label">Card Number:</label>
//             <input
//               type="text"
//               className="cardetails-input"
//               data-mask="0000 0000 0000 0000"
//               placeholder="XXXX-XXXX-XXXX-XXXX"
//               value={cc_format(card.cardno)}
//               onChange={onChange}
//               onKeyPress={(event) => {
//                 if (!/[0-9]/.test(event.key)) {
//                   event.preventDefault();
//                 }
//               }}
//             />
//             <i className={card.cardtype} id="cardtype"></i>
//           </div>

//           <div className="cardetails-card-grp cardetails-space">
//             <div className="cardetails-card-item cardetails-icon-relative">
//               <label className="cardetails-label">Expiry date:</label>

//               <input
//                 type="text"
//                 name="expiry-data"
//                 className="cardetails-input"
//                 placeholder="mm / yy"
//                 onChange={onChangeExp}
//                 value={expriy_format(card.expirydt)}
//               />
//               <i className="far fa-calendar-alt"></i>
//             </div>
//             <div className="cardetails-card-item cardetails-icon-relative">
//               <label className="cardetails-label">Cvv:</label>
//               <input
//                 type="password"
//                 className="cardetails-input"
//                 data-mask="000"
//                 placeholder="000"
//                 maxLength="3"
//                 pattern="[0-9][0-9][0-9]"
//                 onKeyPress={(event) => {
//                   if (!/[0-9]/.test(event.key)) {
//                     event.preventDefault();
//                   }
//                 }}
//               />
//               <i className="fas fa-lock"></i>
//             </div>
//           </div>
//           <div className="cardetails-card cardetails-space cardetails-icon-relative">
//             <label className="cardetails-label">Name on Card:</label>
//             <input type="text" className="cardetails-input" placeholder="" />
//             <i className="fas fa-user"></i>
//           </div>
//           <div className="cardetails-btn">Confirm Payment</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };
// export default Payment;
