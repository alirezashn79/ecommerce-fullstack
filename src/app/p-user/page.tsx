import styles from "@/styles/p-user/index.module.css";
import { getUserId } from "@/utils/serverHelpers";
import Box from "components/templates/p-user/index/box";
import Orders from "components/templates/p-user/index/orders";
import Tickets from "components/templates/p-user/index/tickets";
import commentModel from "models/Comment";
import wishListModel from "models/Wishlist";
const page = async () => {
  const userId = await getUserId();
  const comments = await commentModel.countDocuments({ user: userId });
  const wishlists = await wishListModel.countDocuments({ user: userId });
  return (
    <main>
      <section className={styles.boxes}>
        <Box title="مجموع تیکت ها " value="20" />
        <Box title="مجموع کامنت ها " value={String(comments)} />
        <Box title="مجموع سفارشات" value="2" />
        <Box title="مجموع علاقه مندی ها" value={String(wishlists)} />
      </section>
      <section className={styles.contents}>
        <Tickets />
        <Orders />
      </section>
    </main>
  );
};

export default page;
