import csvParser from "csv-parser";
import { Stock } from "../models/stock.model.js";
import fs from "fs";
const ProcessData = async () => {
  const stocks = await Stock.find().countDocuments();

  if (stocks == 0) {
    fs.createReadStream("../script/data/data.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        for (let i = 0; i < result.length; i++) {
          const stock = new Stock({
            code: result[i].SC_CODE,
            name: result[i].SC_NAME,
            open: result[i].OPEN,
            high: result[i].HIGH,
            low: result[i].LOW,
            close: result[i].CLOSE,
          });
          stock.save();
        }
      });
  }
};
export { ProcessData };
