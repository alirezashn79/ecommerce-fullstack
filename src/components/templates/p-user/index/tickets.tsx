import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Ticket from "./ticket";
import styles from "./tickets.module.css";
interface ITicket {
  _id: string;
  title: string;
  department: {
    _id: string;
    title: string;
  };
  subDepartment: {
    _id: string;
    title: string;
  };
  createdAt: Date;
  hasAnswered: boolean;
}
const Tickets = ({ tickets }: { tickets: ITicket[] }) => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      {tickets.map((item) => (
        <Ticket key={item._id} ticket={item} />
      ))}

      {tickets.length === 0 && <p className={styles.empty}>تیکتی ثبت نشده</p>}
    </div>
  );
};

export default Tickets;
