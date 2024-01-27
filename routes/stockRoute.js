import express from "express";
import {
  getStockByName,
  getStockForUI,
  getTop10Stocks,
} from "../controller/stockController.js";
const router = express.Router();

router.get("/top10stocks", getTop10Stocks);
router.get("/getByName", getStockByName);
router.get("/getForgraph", getStockForUI);

export default router;
