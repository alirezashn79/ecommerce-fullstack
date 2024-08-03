import { object, string } from "zod";

export const zPhoneSchema = object({
  phone: string()
    .min(11)
    .regex(/^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/g),
});
export const zCodeSchema = object({
  code: string().min(5).max(5),
});
export const zVerifySchema = zPhoneSchema.and(zCodeSchema);
