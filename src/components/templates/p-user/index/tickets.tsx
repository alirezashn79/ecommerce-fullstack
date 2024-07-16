import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Ticket from "./ticket";
import styles from "./tickets.module.css";

const Tickets = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      <Ticket />
      <Ticket />
      <Ticket />

      {/* <p className={styles.empty}>تیکتی ثبت نشده</p> */}
    </div>
  );
};

export default Tickets;
