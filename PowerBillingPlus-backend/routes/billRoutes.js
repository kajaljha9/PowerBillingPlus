const express = require("express");
const {
  generateBill,
  getUserBills,
  getMonthlyData,
  getBills,
} = require("../controllers/billController");
const router = express.Router();

router.post("/generate", generateBill);
router.get("/allbills", getBills);
router.get("/user/:userId", getUserBills);
router.get("/monthly", getMonthlyData);

module.exports = router;
