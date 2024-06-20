import connectToDB from "configs/db";
import productModel from "models/Product";
import { ZProductSchema } from "schemas/products";

export async function POST(req: Request) {
  try {
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
