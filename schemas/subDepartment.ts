import { Types } from "mongoose";
import { z } from "zod";

export const zSubDepartmentSchema = z.object({
  title: z.string().trim().min(4),
  department: z.string().refine((value) => Types.ObjectId.isValid(value)),
});
