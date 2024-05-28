import { Schema, model, models } from "mongoose";
import { TUser } from "types/auth";

const userSchema = new Schema<TUser>(
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
const userModel = models.User || model("User", userSchema);

export default userModel;
