// routes/dashboardRoutes.js
import express from 'express';
import {
  getDashboardMetrics,
  getRevenueData,
  getUserPaymentStatusData,
  getUnitsComparisonData
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/metrics', getDashboardMetrics);
router.get('/revenue', getRevenueData);
router.get('/user-payment-status', getUserPaymentStatusData);
router.get('/units-comparison', getUnitsComparisonData);

export default router;