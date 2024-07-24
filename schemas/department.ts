import { z } from "zod";

export const zDepartmentSchema = z.object({
  title: z.string().trim().min(4),
});
