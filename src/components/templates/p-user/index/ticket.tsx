import Link from "next/link";
import styles from "./ticket.module.css";

const Ticket = () => {
  return (
    <Link href={`/p-user/tickets/answer/2323`} className={styles.ticket}>
      <div>
        <p>حجم بسته بندی</p>
        <p className={styles.department}>واحد پشتیبانی</p>
      </div>
      <div>
        <p>8:00 1402/10/21</p>
        <p className={styles.no_answer}>پاسخ داده نشده</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
