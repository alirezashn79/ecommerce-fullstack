import mongoose from "mongoose";
import { TContact } from "types/types";

const schema = new mongoose.Schema<TContact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  },
  phone: {
    type: String,
    required: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g,
  },
  company: String,
  message: {
    type: String,
    required: true,
  },
});

let contactModel: mongoose.Model<TContact>;

try {
  contactModel = mongoose.model<TContact>("Contact");
} catch (error) {
  contactModel = mongoose.model<TContact>("Contact", schema);
}

export default contactModel;
