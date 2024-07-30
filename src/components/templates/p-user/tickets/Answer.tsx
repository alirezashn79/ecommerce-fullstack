import styles from "./answer.module.css";
interface IAnswer {
  username: string;
  userRole: "USER" | "ADMIN";
  creation: Date;
  body: string;
}
const Answer = ({ type, info }: { type: "USER" | "ADMIN"; info: IAnswer }) => {
  return (
    <section
      className={type == "USER" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(info.creation).toLocaleString("fa-IR")}</p>
        <div>
          <div>
            <p>{info.username}</p>
            <span>{info.userRole === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{info.body}</p>
      </div>
    </section>
  );
};

export default Answer;
