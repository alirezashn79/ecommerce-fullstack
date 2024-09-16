"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import swal from "sweetalert";

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

    createdAt: Date;
    isAnswered: boolean;
    answer: {
      body: string;
    };
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

  const showTicketAnswer = ({ ticketAnswer }: { ticketAnswer: string }) => {
    swal({
      title: "پاسخ:",
      text: ticketAnswer,
      closeOnClickOutside: true,
      closeOnEsc: true,
      //   dangerMode: true,
      icon: "info",
    });
  };

  const handleAnswerToTicket = async ({
    ticket,
    department,
    subDepartment,
  }: {
    ticket: string;
    department: string;
    subDepartment: string;
  }) => {
    swal({
      title: "پاسخ را وارد کنید.",
      content: {
        element: "input",
      },
    }).then(async (result) => {
      if (!!result) {
        const answer = {
          body: result,
          department,
          subDepartment,
          ticket,
        };
        try {
          await client.post("/ticket", answer);
          toast.success("پاسخ تیکت با موفقیت ثبت شد");
          refresh();
        } catch (error) {
          console.log(error);
          toast.error("خطا در ثبت پاسخ تیکت");
        }
      }
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
              <th>مشاهده متن</th>
              <th>وضعیت</th>
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
                  {item.isAnswered ? (
                    <button
                      onClick={() =>
                        showTicketAnswer({ ticketAnswer: item.answer.body })
                      }
                      type="button"
                      className={styles.edit_btn}
                    >
                      مشاهده پاسخ
                    </button>
                  ) : (
                    "بدون پاسخ"
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleAnswerToTicket({
                        department: item.department._id,
                        subDepartment: item.subDepartment._id,
                        ticket: item._id,
                      })
                    }
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
