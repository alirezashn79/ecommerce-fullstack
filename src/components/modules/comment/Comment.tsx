import { FaStar } from "react-icons/fa";
import styles from "./comment.module.css";

const Comment = () => {
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>shahin</strong>
            <p>۲۸ آذر ۱۴۰۱</p>
          </div>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p>
          قهوه بسیار خوش عطر و طعمیه…کاش کم کم مدل های کپسول ها رو متنوع تر
          کنید.
        </p>
      </div>
    </section>
  );
};

export default Comment;
