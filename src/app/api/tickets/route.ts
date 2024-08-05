import { authUser } from "@/utils/serverHelpers";
import connectToDB from "configs/db";
import ticketModel from "models/Ticket";
import { zTicketSchema } from "schemas/ticket";

export async function POST(req: Request) {
  try {
    // codes
    const user = await authUser();
    if (!user) {
      return Response.json(
        {
          message: "you are not login",
        },
        {
          status: 401,
        }
      );
    }

    let typedUser;
    if (typeof user === "object") {
      typedUser = user as { _id: string };
    }

    const reqBody = await req.json();

    const validationResult = zTicketSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "invalid data",
          error: validationResult.error.formErrors.fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    await ticketModel.create({
      ...validationResult.data,
      user: typedUser?._id,
    });

    return Response.json(
      { message: "ticket saved" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
