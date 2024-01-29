import axios from "axios";
import unzipper from "unzipper";
import { Readable } from "stream";
import csv from "csv-parser";
import { Stock } from "../models/stock.model.js";

export async function dataProcessing() {
  try {
    const currentDate = new Date();
    const count = await Stock.countDocuments();
    if(count>0) return ;

    for (let i = 0; i < 50; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);

      const formattedDate = formatDate(date);

      const url = `https://www.bseindia.com/download/BhavCopy/Equity/EQ${formattedDate}_CSV.ZIP`;

      await processStockData(url);
    }
  } catch (error) {
    console.error("Error downloading and storing stock data:", error);
  }
}
async function processStockData(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    await unzipper.Open.buffer(response.data).then(async (zip) => {
      for (const entry of zip.files) {
        if (entry.path.endsWith(".CSV")) {
          const csvData = await entry.buffer();
          await parseCSV(csvData.toString());
        }
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`No data found for ${url}`);
    } else {
      console.error("Error downloading and storing stock data:", error);
    }
  }
}

async function parseCSV(csvString) {
  return new Promise((resolve, reject) => {
    const stockData = [];
    const stream = Readable.from(csvString);
    stream
      .pipe(csv())
      .on("data", (row) => {
        stockData.push(row);
      })
      .on("end", async () => {
        if (stockData.length > 0) {
          try {
           console.log(stockData.length);
            const mappedStockData = stockData.map(({ SC_CODE, SC_NAME, OPEN, HIGH, LOW, CLOSE }) => ({
                code: SC_CODE,
                name: SC_NAME.trim(),
                open: parseFloat(OPEN),
                high: parseFloat(HIGH),
                low: parseFloat(LOW),
                close: parseFloat(CLOSE)
              }));
          
              await Stock.insertMany(mappedStockData);
            resolve();
          } catch (error) {
            reject(error);
          }
        } else {
          console.log("No stock data found in the CSV.");
          resolve();
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function formatDate(date) {
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}${month}${year}`;
}


