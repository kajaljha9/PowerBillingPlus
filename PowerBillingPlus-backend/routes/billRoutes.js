// routes/billRoutes.js:
import express from 'express';
import {
  generateBill,
  getAllBills,
  updateBillStatus,
  deleteBill,
  updateBill,
} from '../controllers/billController.js';

const router = express.Router();

router.post('/', generateBill);
router.get('/', getAllBills);
router.put('/:id', updateBillStatus);
router.delete('/:id', deleteBill);
router.put("/bills/:id", updateBill);


export default router;
