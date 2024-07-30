import connectToDB from "configs/db";
import departmentModel from "models/Department";
import subDepartmentModel from "models/SubDepartment";
import ticketModel from "models/Ticket";
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
  department: z.string().refine(async (value) => {
    if (!Types.ObjectId.isValid(value)) return false;

    const isExist = await departmentModel.exists({ _id: value });

    if (!isExist) return false;

    return true;
  }),
  subDepartment: z.string().refine(async (value) => {
    if (!Types.ObjectId.isValid(value)) return false;

    const isExist = await subDepartmentModel.exists({ _id: value });

    if (!isExist) return false;

    return true;
  }),
  ticket: z.string().refine(async (value) => {
    if (!Types.ObjectId.isValid(value)) return false;

    const isExist = await ticketModel.exists({ _id: value });

    if (!isExist) return false;

    return true;
  }),
});
