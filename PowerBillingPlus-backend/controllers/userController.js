//controllers/userController.js
import User from "../models/User.js";
import Bill from "../models/Bill.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const createUser = async (req, res) => {
  const { name, email, phone, region, address, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Auto-generate meterId
    const generateMeterId = async () => {
      let meterId;
      let isUnique = false;

      while (!isUnique) {
        const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
        meterId = `${region.toUpperCase()}-${randomNum}`;
        const exists = await User.findOne({ meterId });
        if (!exists) isUnique = true;
      }

      return meterId;
    };

    const meterId = await generateMeterId();

    const user = await User.create({
      name,
      email,
      phone,
      region,
      address,
      meterId,
      password
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: "user" }, "mcaProject", {
      expiresIn: "3d"
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getUnpaidBillsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const bills = await Bill.find({ user: userId, status: "Unpaid" })
      .sort({ dueDate: 1 })
      .select("-__v");

    res.status(200).json(bills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch unpaid bills", error: error.message });
  }
};

export const getPaidBillsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const paidBills = await Bill.find({ user: userId, status: "Paid" })
      .sort({ billDate: -1 })
      .select("-__v");

    res.status(200).json(paidBills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch paid bills", error: error.message });
  }
};

export const payBill = async (req, res) => {
  try {
    const { billId } = req.params;

    const txnId = "TXN" + Math.floor(Math.random() * 1000000); // Mock txn id
    const paidAt = new Date();

    const bill = await Bill.findByIdAndUpdate(
      billId,
      {
        status: "Paid",
        paymentInfo: { txnId, paidAt }
      },
      { new: true }
    );

    if (!bill) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json({ message: "Payment successful", bill });
  } catch (err) {
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};
