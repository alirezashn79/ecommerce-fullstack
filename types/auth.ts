import { InferType } from "yup";
import { userSchema } from "schemas/auth";
import { z } from "zod";
import { zCommentSchema } from "schemas/comment";
import { Types } from "mongoose";
import { ZProductSchema } from "schemas/products";

export type TUserCreate = InferType<typeof userSchema>;

export type TUser = TUserCreate & {
  role: "ADMIN" | "USER";
  refreshToken?: string;
};

export type TObjectId = Types.ObjectId;

export interface IFComment
  extends Omit<z.infer<typeof zCommentSchema>, "date"> {
  _id: TObjectId;
  date: string;
}

export interface IFProduct extends z.infer<typeof ZProductSchema> {
  _id: TObjectId;
  comments: IFComment[];
}
