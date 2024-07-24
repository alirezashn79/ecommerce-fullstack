import { authUser } from "@/utils/serverHelpers";
import connectToDB from "configs/db";
import subDepartmentModel from "models/SubDepartment";
import { zSubDepartmentSchema } from "schemas/subDepartment";

export async function POST(req: Request) {
  try {
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
      typedUser = user as {
        _id: string;
        role: "ADMIN" | "USER";
      };
    }

    if (typedUser?.role !== "ADMIN") {
      return Response.json(
        {
          message: "you are not allowed",
        },
        {
          status: 401,
        }
      );
    }

    const reqBody = await req.json();

    const validationResult = zSubDepartmentSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "invalid data",
          error: validationResult.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDB();
    const data = await subDepartmentModel.create(validationResult.data);

    return Response.json(
      {
        message: "sub department created",
        data,
      },
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
