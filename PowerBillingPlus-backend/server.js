const express = require("express");
const connectDB = require("./config/database");
const adminRoutes = require("./routes/adminRoutes");
const billRoutes = require("./routes/billRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const cors = require("cors"); // Import CORS
const { authenticate } = require("./controllers/authenticate");
const { getUserBills, getUserBillshistory } = require("./controllers/billController");
const { login } = require("./controllers/userLoginController");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to Bill Management System API");
});
app.post("/login", login);
app.use("/admin", adminRoutes);
app.use("/bill", billRoutes);
app.post('/userbill/:userId',authenticate,getUserBills)
app.post('/history/:userId',authenticate,getUserBillshistory)

app.use("/payment",userRoutes)// pay bill by user

app.listen(3000, () => {
  try {
    connectDB();
    console.log("Connections established");
    console.log("Server running on port 3000");
  } catch (error) {
    console.log("connection error: " + error);
  }
});
