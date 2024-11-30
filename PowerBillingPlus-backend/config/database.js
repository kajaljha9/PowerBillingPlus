const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      // "mongodb://localhost:27017/electric-bill",
    
      "mongodb+srv://abidkhan5193:OKRLNexvVED0hO4W@cluster0.zl9uc.mongodb.net/PowerBillingPlus",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
