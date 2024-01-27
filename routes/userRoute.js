import express from "express";
import {
  addFavoriteStock,
  getAllFavorite,
  deleteFavorite,
  register
} from "../controller/userController.js";
const router = express.Router();

router.post("/addFavorite", addFavoriteStock);
router.get("/allFavorite", getAllFavorite);
router.delete("/deleteFavorite", deleteFavorite);
router.post('/register',register);


export default router;
