import mongoose from "mongoose";

const slabSchema = new mongoose.Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  rate: { type: Number, required: true }
});

const tariffSchema = new mongoose.Schema({
  slabs: [slabSchema],
  taxPercent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Tariff", tariffSchema);
