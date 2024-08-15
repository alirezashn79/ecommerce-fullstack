import styles from "@/styles/p-user/index.module.css";
import { authUser } from "@/utils/serverHelpers";
import Box from "components/modules/info-box/box";
import Orders from "components/templates/p-user/index/orders";
import Tickets from "components/templates/p-user/index/tickets";
import commentModel from "models/Comment";
import ticketModel from "models/Ticket";
import wishListModel from "models/Wishlist";
const page = async () => {
  const user = (await authUser()) as {
    _id: string;
    role: "ADMIN" | "USER";
  };
  const comments = await commentModel.countDocuments({ user: user._id });
  const wishlists = await wishListModel.countDocuments({ user: user._id });
  const ticketsLength = await ticketModel.countDocuments({ user: user._id });

  const tickets = await ticketModel
    .find(
      { user: user._id },
      "title department subDepartment hasAnswered createdAt"
    )
    .populate("department", "title")
    .populate("subDepartment", "title")
    .sort({ _id: -1 })
    .limit(2)
    .lean();

  return (
    <main>
      <section className={styles.boxes}>
        <Box title="مجموع تیکت ها " value={String(ticketsLength)} />
        <Box title="مجموع کامنت ها " value={String(comments)} />
        <Box title="مجموع سفارشات" value="2" />
        <Box title="مجموع علاقه مندی ها" value={String(wishlists)} />
      </section>
      <section className={styles.contents}>
        <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
        <Orders />
      </section>
    </main>
  );
};

export default page;
