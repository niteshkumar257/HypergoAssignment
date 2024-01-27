import { User } from "../models/user.model.js";
import { Stock } from "../models/stock.model.js";
const addFavoriteStock = async (req, res) => {
  const { userId, stockId } = req.body;

  try {
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
    } else
      return res.status(404).json({ error: "Incorrect userId or stockId" });
  } catch (error) {
    console.error("Error adding favorite stock:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getAllFavorite = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ allFavoriteStocks: user.favoriteStocks });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
const deleteFavorite = async (req, res) => {
  const { userId, stockId } = req.body;
  try {
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
      allFavoriteStocks:updatedUser.favoriteStocks
    });
  } catch (err) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    console.log(user);
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
  } catch (err) {
    console.log(err);
  }
};
export { addFavoriteStock, getAllFavorite, deleteFavorite, register };
