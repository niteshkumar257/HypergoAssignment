import { Stock } from "../models/stock.model.js";
import asyncHandler from "../utils/asyncErrorHandler.js";

const getTop10Stocks = asyncHandler(async (req, res) => {
  const { parameter } = req.query;
  let sortQuery = {};

  if (parameter) {
    const parameters = parameter.split(",");

    parameters.forEach((paramWithValue) => {
      const [param, value] = paramWithValue.split(":");

      if (["open", "high", "low", "close"].includes(param)) {
        const sortOrder = parseInt(value);

        if (sortOrder === -1 || sortOrder === 1) {
          sortQuery[param] = sortOrder;
        }
      }
    });
  }

  // If no valid parameter sort via desc
  if (Object.keys(sortQuery).length === 0) {
    sortQuery["close"] = -1;
  }

  const allStocks = await Stock.find().sort(sortQuery).limit(10); // Database query

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

const getStockForUI = async (req, res) => {
  const { stockCode } = req.query;
  // I used stockCode as of now it can also done passing stock_id upon finding stock_code the stock

  if (!stockCode) {
    return res.status(400).json({ error: "Stock code is required" });
  }

  try {
    const stockHistory = await Stock.find({ code: stockCode }).sort({
      createdAt: 1,
    });

    if (!stockHistory || stockHistory.length === 0) {
      return res.status(404).json({ error: "Stock data not found" });
    }

    const graphData = stockHistory.map((stock) => ({
      date: stock.createdAt,
      close: stock.close,
      open:stock.open,
      low:stock.low,
      high:stock.high
    }));

    return res.status(200).json({
      stockCode: stockCode,
      stockHistory: graphData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getTop10Stocks, getStockByName, getStockForUI };
