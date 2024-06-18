import { model, models, Schema, Types } from "mongoose";
import { ZProductSchema } from "schemas/products";
import { infer } from "zod";
import "./Comment";

// interface IProductSchema {
//   name: string;
//   price: number;
//   shortDescription: string;
//   longDescription: string;
//   weight: number;
//   suitableFor: string;
//   smell: string;
//   score: number;
//   tags: string[];
//   comments: Types.ObjectId[];
// }

interface IProductSchema extends infer<typeof ZProductSchema> {
  comments: Types.ObjectId[];
}

const productSchema = new Schema<IProductSchema>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
});

const productModel =
  models.Product || model<IProductSchema>("Product", productSchema);

export default productModel;
