import { Stock } from "../models/stock.model.js";
import asyncHandler from "../utils/asyncErrorHandler.js";

const getTop10Stocks = asyncHandler(async (req, res) => {
  const { parameter } = req.query;

  const allStocks = await Stock.find().sort({ parameter: -1 }).limit(10); // databae query

  return res.status(200).json({
    allStocks: allStocks,
  });
});
const getStockByName = asyncHandler(async (req, res) => {
  const { stock_name } = req.query;

  const stock = await Stock.findOne({
    name: { $regex: stock_name, $options: "i" },
  });

  if (!stock) {
    return res.status(404).json({ error: "No stock found" });
  }
  return res.status(200).json({
    stock: stock,
  });
});
const getStockForUI = (req, res) => {};
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json({
      allStocks: stocks,
      count: stocks.length,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
export { getTop10Stocks, getStockByName, getStockForUI, getAllStocks };
