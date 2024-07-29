import banModel from "models/Ban";
import { banSchema } from "schemas/ban";
import { authUser } from "utils/serverHelpers";

export async function POST(req: Request) {
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

    const validationResult = banSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json({
        message: "invalid data",
        data: validationResult.error.errors,
      });
    }

    const data = await banModel.create(validationResult.data);

    return Response.json({ message: "user banned", data });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}

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

    const validationResult = banSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json({
        message: "invalid data",
        data: validationResult.error.errors,
      });
    }

    const data = await banModel.findOneAndDelete({
      $or: [
        { email: validationResult.data.email },
        { phone: validationResult.data.phone },
      ],
    });

    return Response.json({ message: "user banned", data });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
