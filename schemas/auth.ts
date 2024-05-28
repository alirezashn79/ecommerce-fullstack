import { object, string } from "yup";

export const userSchema = object({
  name: string().min(6).required(),
  email: string().email().nullable(),
  password: string().min(6).nullable(),
  phone: string().min(11).required(),
});
