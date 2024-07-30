import connectToDB from "configs/db";
import answerTicketModel from "models/AnswerTicket";
import ticketModel from "models/Ticket";
import { zAnswerTicketSchema } from "schemas/ticket";
import { authUser } from "utils/serverHelpers";

export async function POST(req: Request) {
  try {
    const user = await authUser();

    if (!user || typeof user !== "object") {
      return Response.json(
        { message: "You are not login yet...!" },
        {
          status: 401,
        }
      );
    }

    if (user.role !== "ADMIN") {
      return Response.json(
        { message: "Only admins can perform this action" },
        {
          status: 403,
        }
      );
    }

    const reqBody = await req.json();

    await connectToDB();

    const validationResult = await zAnswerTicketSchema.safeParseAsync(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid data",
          error: validationResult.error.errors,
        },
        {
          status: 422,
        }
      );
    }

    const answer = await answerTicketModel.create({
      ...validationResult.data,
      user: user._id,
    });
    await ticketModel.findByIdAndUpdate(validationResult.data.ticket, {
      isAnswered: true,
      $set: {
        answer: answer._id,
      },
    });

    return Response.json(
      { message: "Ticket response was recorded" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Erroe", error },
      {
        status: 500,
      }
    );
  }
}
