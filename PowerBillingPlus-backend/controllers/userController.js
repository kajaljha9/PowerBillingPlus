const Bill = require("../models/billModel"); // Path to your Bill model


exports.payBill = async (req, res) => {
  try {
    const { userId, billId, paidAmount } = req.body;

    // Validate input
    if (!userId || !billId || !paidAmount) {
      return res.status(400).json({ error: "User ID, Bill ID, and Paid Amount are required." });
    }

    // Find the bill for the given user
    const bill = await Bill.findOne({ _id: billId, userId: userId });
    console.log("bill",bill)
    if (!bill) {
      return res.status(404).json({ error: "Bill not found for the specified user." });
    }

    // Calculate new balance
    const newBalance = (bill.balance || bill.amount) - paidAmount;
  console.log("newBalance",newBalance)
    // Validate payment amount
    if (newBalance < 0) {
      return res.status(400).json({ error: "Paid amount exceeds the remaining balance." });
    }

    // Update bill details
    bill.balance = newBalance;
    bill.status = newBalance === 0 ? "Paid" : "Pending";

    // Add payment history
    bill.paymentHistory.push({ paidAmount, paymentDate: new Date() });
      console.log("billl=>>>>>>>>>>",bill)
    // Save the updated bill
    await bill.save();

    // Respond with the updated bill
    res.status(200).json({
      message: newBalance === 0 ? "Bill fully paid!" : " Payment successful!",
      bill
    });
  } catch (err) {
    console.log("enter in bill erorr")
    console.error("Error during bill payment:", err);
    res.status(500).json({ error: err.message });
  }
};
