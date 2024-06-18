import { model, models, Schema, Types } from "mongoose";
import { zCommentSchema } from "schemas/comment";
import { infer } from "zod";
import "./Product";

interface ICommentSchema extends infer<typeof zCommentSchema> {
  product: Types.ObjectId;
}

const commentSchema = new Schema<ICommentSchema>({
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
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const commentModel =
  models.Comment || model<ICommentSchema>("Comment", commentSchema);

export default commentModel;
