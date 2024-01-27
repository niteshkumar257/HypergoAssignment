import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteStocks: [
    {
      stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stock",
      },
    },
  ],
});
export const User = mongoose.model("user", userSchema);
