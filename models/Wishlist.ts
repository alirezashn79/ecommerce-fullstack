import { model, models, Schema, Types } from "mongoose";
import "./Product";
import "./User";

interface IWishlistModelSchema {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const wishlistSchema = new Schema<IWishlistModelSchema>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const wishListModel =
  models.Wishlist || model<IWishlistModelSchema>("Wishlist", wishlistSchema);

export default wishListModel;
