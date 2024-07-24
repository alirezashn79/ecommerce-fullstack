import Link from "next/link";
import styles from "./ticket.module.css";
interface ITicket {
  ticket: {
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
    isAnswer: boolean;
    createdAt: Date;
  };
}
const Ticket = ({ ticket }: ITicket) => {
  return (
    <Link
      href={`/p-user/tickets/answer/${ticket._id}`}
      className={styles.ticket}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{ticket.title}</p>
        <div>
          <p className={styles.department}>{ticket.department.title}</p>
          <p className={styles.department}>{ticket.subDepartment.title}</p>
        </div>
      </div>
      <div>
        <p>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.no_answer}>
          {ticket.isAnswer ? "پاسخ داده شده" : "در انتظار پاسخگویی"}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
