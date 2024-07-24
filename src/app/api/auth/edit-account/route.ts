import { authUser } from "@/utils/serverHelpers";
import userModel from "models/User";
import { userInfoSchema } from "schemas/auth";

export async function POST(req: Request) {
  try {
    const user = await authUser();

    if (!user) {
      return Response.json(
        { message: "you are not login" },
        {
          status: 401,
        }
      );
    }

    let typedUser;
    if (user && typeof user === "object") {
      typedUser = user as {
        _id: string;
      };
    }

    const reqBody = await req.json();

    // validate
    const validationResult = userInfoSchema.validateSync(reqBody);

    if (!validationResult) {
      return Response.json(
        { message: "invalid data", error: validationResult },
        {
          status: 400,
        }
      );
    }

    await userModel.findByIdAndUpdate(typedUser?._id, {
      $set: validationResult,
    });

    return Response.json(
      { message: "user info has changed" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "server error", error },
      {
        status: 500,
      }
    );
  }
}
