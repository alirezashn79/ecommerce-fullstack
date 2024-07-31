import discountModel from "models/Discount";
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

    await discountModel.findByIdAndDelete(params.id);

    return Response.json(
      { message: "dicount deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "server Error", error },
      {
        status: 500,
      }
    );
  }
}
