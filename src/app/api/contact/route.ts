import connectToDB from "configs/db";
import contactModel from "models/Contact";
import { contactSchema } from "schemas/contact";
import { TContact } from "types/types";

export async function POST(req: Request) {
  try {
    const reqBody: TContact = await req.json();

    const validationResult = contactSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "invalid data",
          error: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const message = await contactModel.create(validationResult.data);

    return Response.json({
      message: "Contact",
      data: message,
    });
  } catch (error) {
    return Response.json({ message: "Server Error...!", data: error });
  }
}
