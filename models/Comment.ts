import mongoose from "mongoose";
import { zCommentSchema } from "schemas/comment";
import { TypeOf } from "zod";
import "./Product";
import "./User";

type TCommentSchema = Omit<TypeOf<typeof zCommentSchema>, "product"> & {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
};

const commentSchema = new mongoose.Schema<TCommentSchema>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

let commentModel: mongoose.Model<TCommentSchema>;
try {
  commentModel = mongoose.model<TCommentSchema>("Comment");
} catch (error) {
  commentModel = mongoose.model<TCommentSchema>("Comment", commentSchema);
}

export default commentModel;
