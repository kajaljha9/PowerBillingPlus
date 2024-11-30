const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.body.headers?.Authorization || req.headers.authorization;

  console.log("Authorization: ", authHeader);
  
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1]; // Assumes 'Bearer <token>' format
  console.log("Extracted Token: ", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token found." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "tanji"); // Replace "tanji" with your actual secret key
    req.userId = decoded.userId;

    console.log("Token is valid, userId: ", req.userId);
    next();
  } catch (err) {
    console.error("Token verification error: ", err.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
