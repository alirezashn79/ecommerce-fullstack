import { Types } from "mongoose";
import { object, z } from "zod";

export const zTicketSchema = z.object({
  title: z.string().trim().min(4),
  department: z
    .string()
    .refine(
      (value) => Types.ObjectId.isValid(value),
      "لطفا یک دپارتمان را انتخاب کنید"
    ),
  subDepartment: z
    .string()
    .refine(
      (value) => Types.ObjectId.isValid(value),
      "لطفا یک واحد را انتخاب کنید"
    ),
  priority: z.enum(["1", "2", "3"], {
    message: "اولویت الزامی است",
  }),
  body: z.string().trim().min(6),
  isAnswered: z.boolean().default(false),
});

export const zAnswerTicketSchema = object({
  body: z.string().trim().min(6),
  department: z.string().refine((value) => Types.ObjectId.isValid(value)),
  subDepartment: z.string().refine((value) => Types.ObjectId.isValid(value)),
  ticket: z.string().refine((value) => Types.ObjectId.isValid(value)),
});
