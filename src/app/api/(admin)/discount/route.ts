import discountModel from "models/Discount";
import { zDiscountSchema } from "schemas/discount";
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

    const validationResult = zDiscountSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        { message: "Invalid Data", error: validationResult.error.errors },
        {
          status: 422,
        }
      );
    }

    const data = await discountModel.create(validationResult.data);

    return Response.json(
      { message: "Discount created successfully :))", data },
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
