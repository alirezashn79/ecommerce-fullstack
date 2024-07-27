import userModel from "models/User";
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

    if (!isValidObjectId(reqBody.id)) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    const isUser = await userModel.findById(reqBody.id, "role");

    if (!isUser) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    const changedUser = await userModel.findByIdAndUpdate(
      isUser._id,
      {
        $set: {
          role: isUser.role === "USER" ? "ADMIN" : "USER",
        },
      },
      {
        projection: "name role",
      }
    );

    return Response.json({
      message: `The role of the user named ${changedUser.name} was changed to ${
        changedUser.role === "ADMIN" ? "USER" : "ADMIN"
      }`,
    });
  } catch (error) {
    return Response.json(
      { message: "Server Error...!", error },
      {
        status: 500,
      }
    );
  }
}
