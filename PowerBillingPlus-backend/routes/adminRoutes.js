const express = require("express");
const {
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUser,
  getRegion,
  getAdminDashboardData,
} = require("../controllers/adminController");
const router = express.Router();


router.get("/get", getUsers);
router.get("/get/:id", getUser);
router.post("/create", createUser);
router.patch("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.get("/regions",getRegion);
router.get('/dashboard',getAdminDashboardData)

module.exports = router;
