import userModel from "models/User";
import { isValidObjectId } from "mongoose";
import { authUser } from "utils/serverHelpers";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
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

    const id = params.id;

    if (!isValidObjectId(id)) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    await userModel.findByIdAndDelete(id);

    return Response.json({ message: "user removed" });
  } catch (error) {
    return Response.json(
      { message: "Server Error...!", error },
      {
        status: 500,
      }
    );
  }
}
