import { model, models, Schema, Types } from "mongoose";
import { zCommentSchema } from "schemas/comment";
import { TypeOf } from "zod";
import "./Product";
import "./User";

type TCommentSchema = Omit<TypeOf<typeof zCommentSchema>, "product"> & {
  product: Types.ObjectId;
  user: Types.ObjectId;
};

const commentSchema = new Schema<TCommentSchema>({
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
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const commentModel =
  models.Comment || model<TCommentSchema>("Comment", commentSchema);

export default commentModel;
