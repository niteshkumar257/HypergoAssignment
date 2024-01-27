import mongoose from "mongoose";

const connectionString = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const connectionInfo = await mongoose.connect(connectionString);
    return connectionInfo;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default connectDb;
