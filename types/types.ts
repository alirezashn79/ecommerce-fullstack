import { contactSchema } from "schemas/contact";
import { TypeOf } from "zod";

export type TContact = TypeOf<typeof contactSchema>;
