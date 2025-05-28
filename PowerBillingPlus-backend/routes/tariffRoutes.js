import express from "express";
import {
  createOrUpdateTariff,
  getTariff
} from "../controllers/tariffController.js";

const router = express.Router();

router.get("/", getTariff);
router.post("/", createOrUpdateTariff);

export default router;
