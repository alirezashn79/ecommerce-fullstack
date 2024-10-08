import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Order from "./order";
import styles from "./orders.module.css";

const Orders = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>سفارش های اخیر</p>
        <Link href="/p-user/orders">
          همه سفارش ها <FaArrowLeft />
        </Link>
      </div>
      <Order />
      <Order />
      <Order />

      {/* <p className={styles.empty}>سفارشی ثبت نشده</p> */}
    </div>
  );
};

export default Orders;
