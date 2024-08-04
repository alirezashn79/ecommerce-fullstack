import { Schema, model, models } from "mongoose";

interface IUserModel {
  name: string;
  phone: string;
  role: "ADMIN" | "USER";
  refreshToken?: string;
  email?: string;
  password?: string;
}
const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      // required: true,
      default: "کاربر ست کافی",
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
const userModel = models.User || model<IUserModel>("User", userSchema);

export default userModel;
