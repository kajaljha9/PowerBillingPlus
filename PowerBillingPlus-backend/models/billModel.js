const mongoose = require("mongoose");
const billSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  unitsUsed: { type: Number, required: true },
  amount: { type: Number, required: true }, // Total amount
  balance: { type: Number, default: 0 }, // Remaining balance after partial payment
  billDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Paid", "Partially Paid", "Unpaid", "Pending"],
    default: "Unpaid"
  },
  paymentHistory: [
    {
      paidAmount: Number,
      paymentDate: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Bill", billSchema);
