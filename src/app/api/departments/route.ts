import { authUser } from "@/utils/serverHelpers";
import connectToDB from "configs/db";
import departmentModel from "models/Department";
import { zDepartmentSchema } from "schemas/department";

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

    const validationResult = zDepartmentSchema.safeParse(reqBody);

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
    const data = await departmentModel.create(validationResult.data);

    return Response.json(
      {
        message: "department created",
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

export async function GET() {
  try {
    await connectToDB();
    const result = await departmentModel.find();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
