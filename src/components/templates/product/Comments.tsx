import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";
import { IFComment } from "types/auth";

const Comments = ({
  comments,
  productName,
  productID,
}: {
  comments: IFComment[];
  productName: string;
  productID: string;
}) => {
  return (
    <div>
      <p>نظرات ({comments.filter((item) => item.isAccepted).length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            ({comments.filter((item) => item.isAccepted).length}) دیدگاه برای{" "}
            {productName}
          </p>
          <div>
            {comments
              .filter((item) => item.isAccepted)
              .map((comment) => (
                <Comment key={comment._id.toString()} comment={comment} />
              ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
