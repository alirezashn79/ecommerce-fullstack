import { object, string } from "yup";

export const userSchema = object({
  name: string().min(6).required(),
  email: string().email().optional(),
  password: string().min(6).optional(),
  phone: string().min(11, "شماره نامعتبر است").required(),
});
