"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../utils/config");
const connectDB = () => {
    mongoose_1.default
        .connect(config_1.config.mongo.url, {
        appName: config_1.config.mongo.appName,
        dbName: config_1.config.mongo.dbName,
        writeConcern: {
            w: "majority",
        },
        retryWrites: true,
        // retryReads : false
    })
        .then(() => {
        console.log(`Connected to MongoDB Cluster - ${config_1.config.mongo.appName}, DB - ${config_1.config.mongo.dbName}`);
    });
    mongoose_1.default.connection.on("error", (error) => {
        console.log("Error while connecting to mongoose>>", error);
    });
};
exports.connectDB = connectDB;
//# sourceMappingURL=connectDB.js.map