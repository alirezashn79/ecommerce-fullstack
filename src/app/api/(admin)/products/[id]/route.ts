import connectToDB from "configs/db";
import productModel from "models/Product";
import { isValidObjectId } from "mongoose";
import { ZProductSchema } from "schemas/products";
import { authUser } from "utils/serverHelpers";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // codes
    const { id } = params;

    if (!isValidObjectId(id))
      return Response.json(
        { message: "id not found" },
        {
          status: 400,
        }
      );

    await connectToDB();
    const product = await productModel.findById(id);

    if (!product)
      return Response.json(
        { message: "product not found" },
        {
          status: 404,
        }
      );

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
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
    // codes
    const { id } = params;

    if (!isValidObjectId(id))
      return Response.json(
        { message: "id not found" },
        {
          status: 400,
        }
      );
    await connectToDB();
    const product = await productModel.exists({ _id: id });

    if (!product)
      return Response.json(
        { message: "product not found" },
        {
          status: 404,
        }
      );

    const reqBody = await req.json();

    const validationResult = ZProductSchema.partial().safeParse(reqBody);

    if (!validationResult.success)
      return Response.json(
        { message: "invalid data", error: validationResult.error.errors },
        {
          status: 422,
        }
      );

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      validationResult.data
    );

    return Response.json({ message: "product updated", data: updatedProduct });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
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

    // codes
    const { id } = params;

    if (!isValidObjectId(id))
      return Response.json(
        { message: "id not found" },
        {
          status: 400,
        }
      );
    await connectToDB();
    const product = await productModel.exists({ _id: id });

    if (!product)
      return Response.json(
        { message: "product not found" },
        {
          status: 404,
        }
      );

    await productModel.findByIdAndDelete(id);

    return Response.json({ message: "product deleted successfully" });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
