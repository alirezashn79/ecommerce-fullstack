import { authUser } from "@/utils/serverHelpers";
import connectToDB from "configs/db";
import commentModel from "models/Comment";
import productModel from "models/Product";
import { zCommentSchema } from "schemas/comment";

export async function POST(req: Request) {
  try {
    const user = await authUser();

    if (!user) {
      return Response.json(
        { message: "you are not login...!" },
        {
          status: 401,
        }
      );
    }

    const reqBody = await req.json();

    const validationResult = zCommentSchema.safeParse(reqBody);

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

    const product = await productModel.findById(
      validationResult.data.product,
      "score comments"
    );

    if (!product) {
      return Response.json(
        { message: "product not found...!" },
        {
          status: 404,
        }
      );
    }

    const comment = await commentModel.create({
      ...validationResult.data,
      user: user._id,
    });

    // const totalScore = Math.ceil(
    //   (validationResult.data.score + product.comments.length * product.score) /
    //     (product.comments.length + 1)
    // );
    await productModel.findByIdAndUpdate(validationResult.data.product, {
      $push: {
        comments: comment._id,
      },
      // score: totalScore,
    });

    return Response.json(
      {
        message: "comment created successfully 😊",
        data: comment,
      },
      {
        status: 201,
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
