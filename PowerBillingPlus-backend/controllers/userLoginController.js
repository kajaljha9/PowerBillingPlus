const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare password
    console.log("enter");

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      'tanji', 
      // "tanji", 
      { expiresIn: "5h" });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: user
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: err.message });
  }
};
