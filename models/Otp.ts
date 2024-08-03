import { model, models, Schema } from "mongoose";

interface IOtp {
  phone: string;
  code: string;
  expTime: number;
  usedTime: number;
}

const schema = new Schema<IOtp>({
  code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  expTime: {
    type: Number,
    // required: true
    // default: new Date().getTime() + 90_000,
    default: Date.now() + 120_000,
  },
  usedTime: {
    type: Number,
    default: 0,
  },
});

const otpModel = models.Otp || model<IOtp>("Otp", schema);

export default otpModel;
