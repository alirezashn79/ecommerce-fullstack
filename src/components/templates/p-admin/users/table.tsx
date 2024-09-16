"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./table.module.css";
import ModalComponent from "components/modules/react-modal/Modal";
import swal from "sweetalert";

interface ITable {
  title: string;
  users: {
    _id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
  }[];
  bannedUsers: {
    _id: string;
    email: string;
    phone: string;
  }[];
}
export default function Table({ title, users, bannedUsers }: ITable) {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { refresh } = useRouter();

  const toggleRoleHandler = async (id: string) => {
    try {
      setLoading(true);
      const res = await client.put("/user/role", {
        id,
      });
      toast.success(res.data.message);
      refresh();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (id: string, name: string) => {
    swal({
      title: `کاربر ${name} حذف شود؟`,
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        try {
          await client.delete(`/user/${id}`);
          refresh();
          swal({
            title: `کاربر ${name} حذف شد`,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email || "---------------------------"}</td>
                <td>{item.role === "USER" ? "کاربر" : "مدیر"}</td>
                <td>
                  <button
                    onClick={() => setIsOpenModal(true)}
                    type="button"
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    disabled={loading}
                    onClick={() => toggleRoleHandler(item._id)}
                    type="button"
                    className={styles.edit_btn}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveUser(item._id, item.name)}
                    type="button"
                    className={styles.delete_btn}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  {bannedUsers.findIndex(
                    (it) => it.email === item.email || it.phone === item.phone
                  ) === -1 ? (
                    <button
                      onClick={() =>
                        handleBanUser(item.email, item.phone, item.name)
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
                          item.email,
                          item.phone,
                          item.name
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

      <ModalComponent isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <form>s</form>
      </ModalComponent>
    </div>
  );
}
