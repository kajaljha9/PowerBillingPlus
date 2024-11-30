const express = require("express");
const { payBill } = require("../controllers/userController");

const router = express.Router();
console.log("enter here")
router.post("/paybill", payBill);


module.exports = router;
