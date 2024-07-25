import Link from "next/link";
import styles from "./ticket.module.css";
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
const Ticket = ({ ticket }: { ticket: ITicket }) => {
  return (
    <Link
      href={`/p-user/tickets/answer/${ticket._id}`}
      className={styles.ticket}
    >
      <div>
        <p style={{ textAlign: "right", marginLeft: "auto" }}>{ticket.title}</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className={styles.department}>{ticket.department.title}</p>
          <p className={styles.department}>{ticket.subDepartment.title}</p>
        </div>
      </div>
      <div>
        <p>{new Date(ticket.createdAt).toLocaleString("fa-IR")}</p>
        <p className={ticket.hasAnswered ? styles.answer : styles.no_answer}>
          {ticket.hasAnswered ? "پاسخ داده شده" : "در انتظار پاسخگویی"}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
