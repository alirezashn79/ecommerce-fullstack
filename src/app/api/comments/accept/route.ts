import commentModel from "models/Comment";
import { isValidObjectId } from "mongoose";
import { authUser } from "utils/serverHelpers";

export async function PUT(req: Request) {
  try {
    const user = await authUser();

    let typedUser;
    if (!user || typeof user !== "object") {
      return Response.json(
        { message: "You are not login yet...!" },
        {
          status: 401,
        }
      );
    }

    typedUser = user as {
      _id: string;
      role: "ADMIN" | "USER";
    };

    if (typedUser.role !== "ADMIN") {
      return Response.json(
        { message: "Only admins can perform this action" },
        {
          status: 403,
        }
      );
    }

    const reqBody = await req.json();
    const comment = await commentModel.exists({ _id: reqBody.id });
    if (!isValidObjectId(reqBody) || !comment) {
      return Response.json(
        { message: "comment not found" },
        {
          status: 404,
        }
      );
    }

    await commentModel.findByIdAndUpdate(reqBody.id, {
      isAccepted: true,
    });

    return Response.json({ message: "comment accepted successfully :))" });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
