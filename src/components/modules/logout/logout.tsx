"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import swal from "sweetalert";
import styles from "./logout.module.css";

export default function Logout() {
  const { replace, refresh } = useRouter();
  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        await client.get("/auth/signout");
        swal({
          icon: "success",
          title: "خروج با موفقیت",
        }).then(() => {
          replace("/");
          refresh();
        });
      }
    });
  };
  return (
    <div className={styles.logout} onClick={logoutHandler}>
      <MdLogout />
      خروج
    </div>
  );
}
