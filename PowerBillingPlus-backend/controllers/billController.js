const Bill = require("../models/billModel");
const User = require("../models/userModel");
const moment = require("moment");

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate(
      "userId",
      "name email region address phone"
    );
    // res.json(bills);
    res.status(200).json({ success: true, bills });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch bills",
        error: error.message
      });
  }
};
exports.generateBill = async (req, res) => {
  try {
    const { userId, unitsUsed, amount, billDate, dueDate } = req.body;
    const bill = new Bill({
      userId,
      unitsUsed,
      amount,
      billDate,
      dueDate,
      status: "Unpaid",
      paymentHistory: [],
    });
    await bill.save();
    res.status(201).json({ message: "Bill generated successfully!", bill });
  } catch (err) {
    console.log("error in generate bill");
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBills = async (req, res) => {
  console.log("enter");
  console.log("id", req.params.userId);
  try {
    const bills = await Bill.find({ userId: req.params.userId });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBillshistory = async (req, res) => {
  console.log("enter");
  console.log("id", req.params.userId);

  try {
    // Fetch bills for the given userId where the status is "Paid"
    const bills = await Bill.find({
      userId: req.params.userId,
      status: "Paid"
    });

    // Respond with the filtered bills
    res.json(bills);
  } catch (err) {
    console.error("Error fetching user bills:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMonthlyData = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Ensure month and year are provided in the query params
    if (!month || !year) {
      return res.status(400).json({ error: "Month and Year are required." });
    }

    // Create start and end dates using moment.js
    const start = moment()
      .month(month - 1)
      .year(year)
      .startOf("month")
      .toDate(); // 0-based month index
    const end = moment(start).endOf("month").toDate();

    // Find bills within the specified date range
    const bills = await Bill.find({ billDate: { $gte: start, $lte: end } });

    // Calculate the total units and total paid bills
    const totalUnits = bills.reduce((sum, bill) => sum + bill.unitsUsed, 0);
    const totalPaid = bills.filter((bill) => bill.status === "Paid").length;

    // Return the result as a JSON response
    res.json({ totalUnits, totalPaid, bills });
  } catch (err) {
    console.error("Error fetching monthly data:", err);
    res.status(500).json({ error: err.message });
  }
};
