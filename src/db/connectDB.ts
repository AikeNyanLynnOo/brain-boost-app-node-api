import mongoose from "mongoose";
import { config } from "../utils/config";

export const connectDB = () => {
  mongoose
    .connect(config.mongo.url, {
      appName: config.mongo.appName,
      dbName: config.mongo.dbName,
      writeConcern: {
        w: "majority",
      },
      retryWrites: true,
      // retryReads : false
    })
    .then(() => {
      console.log(
        `Connected to MongoDB Cluster - ${config.mongo.appName}, DB - ${config.mongo.dbName}`
      );
    });
  mongoose.connection.on("error", (error: Error) => {
    console.log("Error while connecting to mongoose>>", error);
  });
};
