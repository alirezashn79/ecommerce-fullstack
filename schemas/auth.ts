import { object, string } from "yup";

export const userSchema = object({
  name: string().trim().min(6).required(),
  email: string()
    .trim()
    .matches(/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email is not valid")
    .optional(),
  password: string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    )
    .required(),
  phone: string()
    .trim()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "phone number is not valid"
    )
    .min(11, "phone number must be atleast 11 character")
    .required(),
});

export const signinWithEmailSchema = object({
  email: string()
    .trim()
    .matches(/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email is not valid")
    .required(),

  password: string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    )
    .required(),
});

const validateEmail = (email: string | undefined) => {
  return string()
    .trim()
    .matches(/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email is not valid")
    .required()
    .isValidSync(email);
};
const validatePhone = (phone: number | undefined) => {
  return string()
    .trim()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "phone number is not valid"
    )
    .min(11, "phone number must be atleast 11 character")
    .required()
    .isValidSync(phone);
};
export const signinDynamicIndntifier = object({
  identifier: string()
    .trim()
    .required("phone or email is required")
    .test("identifier", "email or phone is invalid", (value) => {
      return validateEmail(value) || validatePhone(value);
    }),
  password: string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    )
    .required(),
});
