import mongoose from "mongoose";
import { TUser } from "types/auth";

const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      minlength: 11,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    refreshToken: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
let userModel: mongoose.Model<TUser>;

try {
  userModel = mongoose.model<TUser>("User");
} catch (error) {
  userModel = mongoose.model<TUser>("User", userSchema);
}

export default userModel;
