import { InferType } from "yup";
import { userSchema } from "schemas/auth";

export type TUserCreate = InferType<typeof userSchema>;

export type TUser = TUserCreate & {
  role: "ADMIN" | "USER";
  refreshToken?: string;
};
