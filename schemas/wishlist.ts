import { Types } from "mongoose";
import { object, string } from "zod";

export const zWishlistSchema = object({
  user: string().refine((value) => Types.ObjectId.isValid(value)),
  product: string().refine((value) => Types.ObjectId.isValid(value)),
});
