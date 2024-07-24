"use client";
import styles from "@/styles/p-user/dataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";

interface IDataTableProps {
  title: string;
  comments: unknown;
}

export default function DataTable({ comments, title }: IDataTableProps) {
  const showCommentBody = (commentBody: string) => {
    swal({
      title: commentBody,
      buttons: "فهمیدم",
    });
  };

  let typedComments = null;
  if (comments && typeof comments === "object") {
    typedComments = comments as {
      _id: string;
      body: string;
      score: number;

      isAccepted: boolean;
      product: {
        _id: string;
        name: string;
      };
      date: Date;
    }[];
  }

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه کامنت</th>
              <th>تاریخ</th>
              <th>محصول</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>مشاهده متن</th>
            </tr>
          </thead>
          <tbody>
            {typedComments?.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{new Date(item.date).toLocaleDateString("fa-IR")}</td>
                <td>{item.product.name}</td>
                <td>
                  {Array.from({ length: 5 - item.score })
                    .fill(1)
                    .map((_, idx) => (
                      <FaRegStar key={idx} />
                    ))}
                  {Array.from({ length: item.score })
                    .fill(1)
                    .map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                </td>
                <td>
                  <button type="button" className={styles.no_check}>
                    {item.isAccepted ? "تایید شده" : "در انتظار تایید"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => showCommentBody(item.body)}
                    className={styles.btn}
                  >
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
