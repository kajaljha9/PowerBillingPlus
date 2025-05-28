//models/Payment.js:

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  units: Number,
  amount: Number,
  month: String,
  dueDate: Date,
  status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' },
  paymentInfo: {
    txnId: String,
    paidAt: Date
  }
});


const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;