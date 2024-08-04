import { model, models, Schema } from "mongoose";

interface IOtp {
  phone: string;
  code: string;
  expTime: number;
  // usedTime: number;
  isExpired: boolean;
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
    required: true,
  },
  // usedTime: {
  //   type: Number,
  //   default: 0,
  // },
  isExpired: {
    type: Boolean,
    default: false,
  },
});

const otpModel = models.Otp || model<IOtp>("Otp", schema);

export default otpModel;
