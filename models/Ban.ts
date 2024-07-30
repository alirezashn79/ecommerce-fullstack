import mongoose from "mongoose";

interface IBan {
  email?: string;
  phone?: string;
}

const schema = new mongoose.Schema<IBan>(
  {
    email: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

let banModel: mongoose.Model<IBan>;

try {
  banModel = mongoose.model<IBan>("Ban");
} catch (error) {
  banModel = mongoose.model<IBan>("Ban", schema);
}

export default banModel;
