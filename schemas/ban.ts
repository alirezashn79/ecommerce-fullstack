import { object, string } from "zod";

export const banSchema = object({
  email: string().email(),
  phone: string().trim(),
})
  .partial()
  .refine(
    (values) => !!values.email || !!values.phone,
    "at least one of email or password is required"
  );
