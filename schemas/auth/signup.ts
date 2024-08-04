import { object, string } from "zod";

const zPassword = object({
  password: string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  ),
});

export const zSignUpUserSchema = object({
  name: string().trim().default("کاربر ست کافی"),
  phone: string()
    .min(11)
    .regex(/^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/g),
  email: string().nullable().optional(),
  password: string().optional().nullable(),
  // .refine((value) => {
  //   if (!!value) {
  //     return zPassword.safeParse({ password: value }).success;
  //   } else {
  //     return true;
  //   }
  // }),
}).refine((values) => {
  if (!values.email) {
    return (values.email = `${values.phone}@gmail.com`);
  } else {
    return true;
  }
});
