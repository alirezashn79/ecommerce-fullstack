import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = () => {
  return (
    <div>
      <p>نظرات (7) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            7 دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD )
            ده -10- عددی
          </p>
          <div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </div>
  );
};

export default Comments;
