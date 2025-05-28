import express from "express";
import { generateMockBills, generateMockUsers } from "../utils/mockUtils.js";
import User from '../models/User.js';


const router = express.Router();

router.post("/generate-users", async (req, res) => {
  try {
    const users = await generateMockUsers(req.body.count || 20);
    res.status(201).json({ message: "Mock users created", count: users.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to create mock users", error: error.message });
  }
});

router.post("/generate-bills", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) return res.status(400).json({ message: "No users found" });

    const bills = await generateMockBills(users);
    res.status(201).json({ message: "Mock bills created", count: bills.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to create mock bills", error: error.message });
  }
});

export default router;
