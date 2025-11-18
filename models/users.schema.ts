import { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { Schema } from "mongoose";

type User = {
  id: string;
  name: string;
  age: number;
};
export const UserSchema = new Schema<User>(
  {
    name: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
