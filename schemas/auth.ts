import { object, string } from "yup";

export const userSchema = object({
  name: string().min(6).required(),
  email: string()
    .matches(/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email is not valid")
    .optional(),
  password: string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    )
    .required(),
  phone: string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "phone number is not valid"
    )
    .min(11, "phone number must be atleast 11 character")
    .required(),
});

export const signinWithEmailSchema = object({
  email: string()
    .matches(/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email is not valid")
    .required(),

  password: string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    )
    .required(),
});
