import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import userRouter from "./routes/userRoute.js";
import stockRouter from "./routes/stockRoute.js";
import { ProcessData } from "./script/dataProcessing.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/stock", stockRouter);

connectDb()
  .then((res) => {
    ProcessData();

    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
