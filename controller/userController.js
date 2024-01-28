import { User } from "../models/user.model.js";
import { Stock } from "../models/stock.model.js";
import asyncHandler from "../utils/asyncErrorHandler.js";

const addFavoriteStock = asyncHandler(async (req, res) => {
  const { userId, stockId } = req.body;

  const user = await User.findById({ _id: userId });
  const stock = await Stock.findById({ _id: stockId });

  if (!user) return res.status(404).json({ error: "No user exits" });
  if (!stock) return res.status(404).json({ error: "No stock exit" });

  const isStockAlreadyAdded = user.favoriteStocks.some(
    (favorite) => favorite.stock.toString() === stockId
  );
  if (isStockAlreadyAdded)
    return res.status(404).json({ error: "this stock already exits" });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { favoriteStocks: { stock: stockId } } },
    { new: true }
  );

  if (updatedUser) {
    return res.status(200).json({ message: "Favorite stock added" });
  } else return res.status(404).json({ error: "Incorrect userId or stockId" });
});
const getAllFavorite = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById({ _id: userId }).populate(
    "favoriteStocks.stock"
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ allFavoriteStocks: user.favoriteStocks });
});
const deleteFavorite = asyncHandler(async (req, res) => {
  const { userId, stockId } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoriteStocks: { stock: stockId } } },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ error: "user not found" });
  }

  res.status(200).json({
    message: "stock removed succefully",
    allFavoriteStocks: updatedUser.favoriteStocks,
  });
});

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (user) {
    return res.status(404).json({ message: "User already exits" });
  }
  const newUser = new User({
    username,
    password,
  });
  const new_user = await newUser.save();
  console.log(new_user);
  res.status(200).json({
    user: new_user,
  });
});
export { addFavoriteStock, getAllFavorite, deleteFavorite, register };
