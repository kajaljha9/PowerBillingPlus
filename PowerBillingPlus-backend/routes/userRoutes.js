// routes/userRoutes.js
import express from 'express';
import Bill from "../models/Bill.js";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  getUnpaidBillsByUser,
  getPaidBillsByUser,
  payBill
} from '../controllers/userController.js';

const router = express.Router();
//admin
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById); 
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser);
//user
// User login
router.post("/login", loginUser);

// Get unpaid bills
router.get("/bills/unpaid/:userId", getUnpaidBillsByUser);

// Get paid bills
router.get("/bills/paid/:userId", getPaidBillsByUser);

// Pay bill
router.post("/pay/:billId", payBill);

export default router;
