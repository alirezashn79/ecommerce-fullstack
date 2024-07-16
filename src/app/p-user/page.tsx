import styles from "@/styles/p-user/index.module.css";
import Box from "components/templates/p-user/index/box";
import Orders from "components/templates/p-user/index/orders";
import Tickets from "components/templates/p-user/index/tickets";
const page = () => {
  return (
    <main>
      <section className={styles.boxes}>
        <Box title="مجموع تیکت ها " value="20" />
        <Box title="مجموع کامنت ها " value="0" />
        <Box title="مجموع سفارشات" value="2" />
        <Box title="مجموع علاقه مندی ها" value="10" />
      </section>
      <section className={styles.contents}>
        <Tickets />
        <Orders />
      </section>
    </main>
  );
};

export default page;
