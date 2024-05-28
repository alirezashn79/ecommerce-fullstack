import { InferType } from "yup";
import { userSchema } from "schemas/auth";

export type TUser = InferType<typeof userSchema> & {
  role: "ADMIN" | "USER";
  refreshToken: string;
};
