import { Stock } from "../models/stock.model.js";


const getTop10Stocks = async(req, res) => {
  const {parameter}=req.query;
  try{
    const stocks=await Stock.find().sort({parameter:-1}).limit(10);
    return res.status(200).json({
      allStocks:stocks
    })

  }catch(err)
  {
    return res.status(500).json({
      error:err
    })
  }
};
const getStockByName = async (req, res) => {
  
  try {
    const { stock_name } = req.query;
    console.log(stock_name)
    const stock = await Stock.findOne({ name: { $regex: stock_name, $options: 'i' } });
   
    if (!stock) {
     return res.status(404).json({ error: "No stock found" });
    }
   return res.status(200).json({
      stock: stock,
    });
  } catch (err) {
    res.status(500).json({
        message:"some thing went wrong"
    })
  }
};
const getStockForUI = (req, res) => {
  
};
export { getTop10Stocks, getStockByName, getStockForUI };
