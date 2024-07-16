import { getUserId } from "@/utils/serverHelpers";
import ProductCard from "components/templates/p-user/wishlist/product";
import wishListModel from "models/Wishlist";
import styles from "styles/p-user/wishlist.module.css";

const WishlistUserPage = async () => {
  const userId = await getUserId();

  const wishes = await wishListModel
    .find({ user: userId })
    .populate("product", "name price score")
    .lean();

  return (
    <div>
      <h1 className={styles.title}>
        <span>علاقه مندی ها</span>
      </h1>
      <div className={styles.container}>
        {wishes.length > 0 &&
          wishes?.map((item) => (
            <ProductCard
              data={JSON.parse(JSON.stringify(item.product))}
              key={String(item._id)}
            />
          ))}
      </div>

      {wishes.length === 0 && <p className={styles.empty}>محصولی وجود ندارد</p>}
    </div>
  );
};

export default WishlistUserPage;
