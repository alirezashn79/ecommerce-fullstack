"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";

interface ITable {
  title: string;
  tickets: {
    _id: string;
    title: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    };
    department: {
      _id: string;
      title: string;
    };
    subDepartment: {
      _id: string;
      title: string;
    };
    priority: string;
    body: string;
    hasAnswered: boolean;
    createdAt: Date;
    answer: string;
    isAnswer: boolean;
  }[];
  bannedUsers: {
    _id: string;
    email: string;
    phone: string;
  }[];
}
export default function Table({ title, tickets, bannedUsers }: ITable) {
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

  const showTicket = (title: string, body: string) => {
    swal({
      title: title,
      text: body,
      closeOnClickOutside: true,
      closeOnEsc: true,
      //   dangerMode: true,
      icon: "info",
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
              <th>عنوان</th>
              <th>کاربر</th>
              <th>دپارتمان</th>
              <th>زیر دپارتمان</th>
              <th>تاریخ ثبت</th>
              <th>وضعیت</th>
              <th>مشاهده متن</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item) => (
              <tr key={item._id}>
                <td>{item._id.slice(16)}</td>
                <td>{item.title}</td>
                <td>{item.user.name}</td>
                <td>{item.department.title}</td>
                <td>{item.subDepartment.title}</td>

                <td>{new Date(item.createdAt).toLocaleString("fa-IR")}</td>
                <td>{item.hasAnswered ? "پاسخ داده شده" : "بدون پاسخ"}</td>

                <td>
                  <button
                    onClick={() => showTicket(item.title, item.body)}
                    type="button"
                    className={styles.edit_btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    // onClick={() => handleRemoveUser(item._id, item.name)}
                    type="button"
                    className={styles.delete_btn}
                  >
                    پاسخ
                  </button>
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
