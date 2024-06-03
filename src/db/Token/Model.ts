import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  refreshToken: {
    type: String,
  },
  //   student: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: "Student",
  //   },
});

export const TokenModel = mongoose.model("Token", tokenSchema);
