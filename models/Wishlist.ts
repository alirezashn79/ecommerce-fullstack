import mongoose from "mongoose";
import "./Product";
import "./User";

interface IWishlistModelSchema {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

const wishlistSchema = new mongoose.Schema<IWishlistModelSchema>({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

let wishListModel: mongoose.Model<IWishlistModelSchema>;

try {
  wishListModel = mongoose.model<IWishlistModelSchema>("Wishlist");
} catch (error) {
  wishListModel = mongoose.model<IWishlistModelSchema>(
    "Wishlist",
    wishlistSchema
  );
}
export default wishListModel;
