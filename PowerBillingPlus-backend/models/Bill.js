//models/Bill.js
import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  units: Number,
  amount: Number,
  month: String,
  billDate: Date,
  dueDate: Date,
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  paymentInfo: {
    txnId: String,
    paidAt: Date,
  },
});



const Bill = mongoose.model('Bill', billSchema);


export default Bill;
