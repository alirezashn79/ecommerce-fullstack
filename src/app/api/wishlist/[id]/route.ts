import { authUser } from "@/utils/serverHelpers";
import connectToDB from "configs/db";
import wishListModel from "models/Wishlist";

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
    const user = (await authUser()) as { _id: string };

    if (!user) {
      return Response.json(
        { message: "you are not login" },
        {
          status: 401,
        }
      );
    }

    const productId = params.id;

    await connectToDB();
    await wishListModel.findOneAndDelete({
      user: user._id,
      product: productId,
    });

    return Response.json(
      { message: "product removed from wishlist" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "server error", error },
      {
        status: 500,
      }
    );
  }
}
