import connectToDB from "configs/db";
import commentModel from "models/Comment";
import productModel from "models/Product";
import { zCommentSchema } from "schemas/comment";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const validationResult = await zCommentSchema.safeParseAsync(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "invalid data",
          error: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const product = await productModel.exists({
      _id: validationResult.data.productID,
    });

    if (!product) {
      return Response.json(
        { message: "product not found...!" },
        {
          status: 404,
        }
      );
    }

    const comment = await commentModel.create(validationResult.data);
    await productModel.findByIdAndUpdate(validationResult.data.productID, {
      $push: {
        comments: comment._id,
      },
    });

    return Response.json(
      {
        message: "comment created successfully 😊",
        data: comment,
      },
      {
        status: 200,
      }
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
    const comments = await commentModel.find({}, "-__v");

    return Response.json(comments);
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the product", error },
      {
        status: 500,
      }
    );
  }
}
