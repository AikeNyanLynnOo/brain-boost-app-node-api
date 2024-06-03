import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "./utils/config";
import { connectDB } from "./db/connectDB";
import routes from "./routes/index";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

connectDB();

app.use("/", routes());

server.listen(config.server.port, () => {
  console.log(`Server is running at PORT ${config.server.port}`);
});
