import { FaStar } from "react-icons/fa";
import styles from "./comment.module.css";
import { IFComment } from "types/auth";

const Comment = ({ comment }: { comment: IFComment }) => {
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{comment.username}</strong>
            {comment.date}
          </div>
          {comment.score > 0 && (
            <div className={styles.stars}>
              {Array.from({ length: comment.score }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
              {comment.score < 5 &&
                Array.from({ length: 5 - comment.score }).map((_, idx) => (
                  <FaStar key={idx} style={{ color: "gray" }} />
                ))}
            </div>
          )}
        </div>
        <p>{comment.body}</p>
      </div>
    </section>
  );
};

export default Comment;
