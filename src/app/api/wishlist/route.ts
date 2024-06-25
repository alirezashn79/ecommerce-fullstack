import connectToDB from "configs/db";
import productModel from "models/Product";
import userModel from "models/User";
import wishListModel from "models/Wishlist";
import { zWishlistSchema } from "schemas/wishlist";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const validationResult = zWishlistSchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        { message: "invalid data", error: validationResult.error.errors },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    const user = await userModel.countDocuments({
      _id: validationResult.data.user,
    });
    if (user === 0) {
      return Response.json({ message: "user not found...!" }, { status: 404 });
    }

    const product = await productModel.countDocuments({
      _id: validationResult.data.product,
    });
    if (product === 0) {
      return Response.json(
        { message: "product not found...!" },
        { status: 404 }
      );
    }

    const isProductExist = await wishListModel.countDocuments({
      product: validationResult.data.product,
    });
    if (isProductExist > 0) {
      return Response.json(
        { message: "the product has already been added to the wishlist" },
        { status: 409 }
      );
    }

    await wishListModel.create(validationResult.data);

    return Response.json(
      { message: "product added to wishlist" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "something went wrong...!", error },
      {
        status: 500,
      }
    );
  }
}
