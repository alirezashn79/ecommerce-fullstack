"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import { toast } from "react-toastify";

interface ITable {
  title: string;
  comments: {
    _id: string;
    body: string;
    score: number;
    isAccepted: boolean;
    product: {
      _id: string;
      name: string;
    };
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    };
    date: Date;
  }[];
  bannedUsers: {
    _id: string;
    email: string;
    phone: string;
  }[];
}
export default function Table({ title, comments, bannedUsers }: ITable) {
  const { refresh } = useRouter();

  const handleBanUser = async (email: string, phone: string, name: string) => {
    swal({
      title: `کاربر ${name} بن شود؟`,
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        try {
          await client.post("/user/ban", { email, phone });
          refresh();
          swal({
            title: `کاربر ${name} بن شد`,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleRemoveFromBanList = async (
    email: string,
    phone: string,
    name: string
  ) => {
    swal({
      title: `کاربر ${name} از لیست بن خارج شود؟`,
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        try {
          await client.put(`/user/ban`, { email, phone });
          refresh();
          swal({
            title: `کاربر ${name} از لیست بن خارج شد`,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const showCommentBody = (body: string) => {
    swal({
      text: body,
      closeOnClickOutside: true,
      closeOnEsc: true,
    });
  };

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
              <th>شناسه</th>
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>محصول</th>
              <th>مشاهده متن</th>
              <th>امتیاز</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>تغییر وضغیت</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item) => (
              <tr key={item._id}>
                <td>{item._id.slice(16)}</td>
                <td>{item.user.name}</td>
                <td>{item.user.email}</td>
                <td>{item.product.name}</td>
                <td>
                  <button
                    onClick={() => showCommentBody(item.body)}
                    type="button"
                    className={styles.edit_btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>{item.score}</td>
                <td>{new Date(item.date).toLocaleString("fa-IR")}</td>
                <td>{item.isAccepted ? "تایید شده" : "تایید نشده"}</td>
                <td>
                  {item.isAccepted ? (
                    <button type="button" className={styles.edit_btn}>
                      رد
                    </button>
                  ) : (
                    <button type="button" className={styles.edit_btn}>
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  {bannedUsers.findIndex(
                    (it) =>
                      it.email === item.user.email ||
                      it.phone === item.user.phone
                  ) === -1 ? (
                    <button
                      onClick={() =>
                        handleBanUser(
                          item.user.email,
                          item.user.phone,
                          item.user.name
                        )
                      }
                      type="button"
                      className={styles.delete_btn}
                    >
                      بن کردن
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleRemoveFromBanList(
                          item.user.email,
                          item.user.phone,
                          item.user.name
                        )
                      }
                      type="button"
                      className={styles.delete_btn}
                    >
                      حذف بن
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
