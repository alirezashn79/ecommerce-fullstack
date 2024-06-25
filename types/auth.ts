import { Types } from "mongoose";
import { userSchema } from "schemas/auth";
import { zCommentSchema } from "schemas/comment";
import { ZProductSchema } from "schemas/products";
import { InferType } from "yup";
import { TypeOf, z } from "zod";

export type TUserCreate = InferType<typeof userSchema>;

export type TUser = TUserCreate & {
  role: "ADMIN" | "USER";
  refreshToken?: string;
};

export type TObjectId = Types.ObjectId;

export interface IFComment extends Omit<TypeOf<typeof zCommentSchema>, "date"> {
  _id: TObjectId;
  date: string;
}
export interface IFProduct extends TypeOf<typeof ZProductSchema> {
  _id: TObjectId;
  comments: IFComment[];
}
