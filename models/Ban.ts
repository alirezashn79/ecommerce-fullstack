import { model, models, Schema } from "mongoose";

interface IBan {
  email?: string;
  phone?: string;
}

const schema = new Schema<IBan>(
  {
    email: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

const banModel = models.Ban || model<IBan>("Ban", schema);

export default banModel;
