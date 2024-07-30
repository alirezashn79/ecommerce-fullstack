import Answer from "components/templates/p-user/tickets/Answer";
import ticketModel from "models/Ticket";
import Link from "next/link";
import styles from "styles/p-user/answerTicket.module.css";
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
  answer?: {
    body: string;
    user: {
      _id: string;
      name: string;
      role: string;
    };
    createdAt: Date;
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const ticket = (await ticketModel
    .findById(params.id, "-department -subDepartment -priority -updatedAt -__v")
    .populate("user", "name role")
    .populate({
      path: "answer",

      populate: [
        {
          path: "user",
          select: "name role",
        },
        {
          path: "department",
          select: "title",
        },
      ],
    })
    .lean()) as ITicket;

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
              userRole: ticket.answer.user.role as "ADMIN",
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
