import styles from "styles/p-admin/index.module.css";
import Box from "components/modules/info-box/box";
import ticketModel from "models/Ticket";
import productModel from "models/Product";
import userModel from "models/User";
import SaleChart from "components/templates/p-admin/sale-chart";
import GrowthChart from "@/components/templates/p-admin/growth-chart";

export default async function AdminHomePage() {
  const ticketsLength = await ticketModel.countDocuments();
  const productsLength = await productModel.countDocuments();
  const usersLength = await userModel.countDocuments({ role: "USER" });
  return (
    <main>
      <section className={styles.dashboard_contents}>
        <Box title="مجموع تیکت های دریافتی" value={ticketsLength.toString()} />
        <Box title="مجموع محصولات سایت" value={productsLength.toString()} />
        <Box title="مجموع سفارشات" value="333" />
        <Box title="مجموع کاربر های سایت" value={usersLength.toString()} />
      </section>{" "}
      <div className={styles.dashboard_charts}>
        <section>
          <p>آمار فروش</p>
          <SaleChart />
        </section>
        <section>
          <p>نرخ رشد</p>
          <GrowthChart />
        </section>
      </div>
    </main>
  );
}
