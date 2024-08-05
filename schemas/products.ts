import { any, array, number, object, string, z } from "zod";

const MAX_FILE_SIZE = 5_000_000; //5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ZProductSchema = object({
  name: string().trim().min(6),
  price: number().positive(),
  shortDescription: string().trim().min(10),
  longDescription: string().trim().min(15),
  weight: number().positive(),
  suitableFor: string().trim().min(4),
  smell: string().trim().min(4),
  score: number().positive().default(5),
  tags: array(string().trim()),
  inventory: number().positive(),
});
