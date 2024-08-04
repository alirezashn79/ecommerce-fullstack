import { object, string } from "zod";

const emailSchema = object({
  email: string().email(),
});
const phoneSchema = object({
  phone: string()
    .min(11)
    .regex(/^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/g),
});

export const zSigninSchema = object({
  identifier: string()
    .refine((value) => {
      if (!value) {
        return false;
      } else {
        return true;
      }
    }, "email or phone required")
    .refine((value) => {
      if (
        emailSchema.safeParse({ email: value }).success ||
        phoneSchema.safeParse({ phone: value }).success
      ) {
        return true;
      } else {
        return false;
      }
    }, "email or password invalid"),
  password: string().optional().nullable(),
});
