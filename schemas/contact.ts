import { object, string } from "zod";

export const contactSchema = object({
  name: string().trim().min(4),
  email: string().email().trim().min(7),
  company: string().optional(),
  phone: string().regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g
  ),
  message: string().trim().min(6),
});
