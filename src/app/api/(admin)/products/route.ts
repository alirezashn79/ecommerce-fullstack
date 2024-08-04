import connectToDB from "configs/db";
import productModel from "models/Product";
import { ZProductSchema } from "schemas/products";
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

    const body = await req.json();

    const validationResult = await ZProductSchema.safeParseAsync(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid data",
          error: validationResult.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    const product = await productModel.create(validationResult.data);

    return Response.json(
      { message: "product created successfully 😊", data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the product", error },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const product = await productModel
      .find({}, "-__v")
      .populate("comments", "-__v");

    return Response.json(product, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the product", error },
      {
        status: 500,
      }
    );
  }
}
