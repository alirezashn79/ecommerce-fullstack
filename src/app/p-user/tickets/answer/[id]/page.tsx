import styles from "styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "components/templates/p-user/tickets/Answer";
import ticketModel from "models/Ticket";
interface ITicket {
  _id: string;
  title: string;
  user: {
    _id: string;
    name: string;
    role: "USER" | "ADMIN";
  };
  body: string;
  hasAnswered: boolean;
  createdAt: Date;
  answer?: ITicket;
}
const page = async ({ params }: { params: { id: string } }) => {
  const ticket: ITicket = await ticketModel
    .findById(params.id, "-department -subDepartment -priority -updatedAt -__v")
    .populate("user", "name role")
    .populate("answer");

  console.log("tocket", ticket);

  console.log(ticket.answer);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>{ticket.title}</span>
        <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
      </h1>

      <div>
        <Answer
          type="USER"
          info={{
            username: ticket.user.name,
            userRole: ticket.user.role,
            body: ticket.body,
            creation: ticket.createdAt,
          }}
        />
        {ticket.answer && (
          <Answer
            type="ADMIN"
            info={{
              username: ticket.answer.user.name,
              userRole: ticket.answer.user.role,
              body: ticket.answer.body,
              creation: ticket.answer.createdAt,
            }}
          />
        )}

        {!ticket.answer && (
          <div className={styles.empty}>
            <p>هنوز پاسخی دریافت نکردید</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
