"use client";
import styles from "@/styles/p-user/dataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";

export default function DataTable() {
  const showCommentBody = (commentBody: string) => {
    swal({
      title: commentBody,
      buttons: "فهمیدم",
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>تست</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>تاریخ</th>
              <th>محصول</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>1403/1/1</td>
              <td>اشکان</td>
              <td>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </td>
              <td>
                <button type="button" className={styles.no_check}>
                  تایید شده
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => showCommentBody("سلام")}
                  className={styles.btn}
                >
                  مشاهده
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
