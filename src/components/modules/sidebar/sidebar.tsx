import Logout from "components/modules/logout/logout";
import { headers } from "next/headers";
import Link from "next/link";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdOutlineAttachMoney, MdSms } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import styles from "./sidebar.module.css";

export default async function Sidebar({
  user,
}: {
  user?: {
    _id: string;
    name: string;
    role: "ADMIN" | "USER";
  };
}) {
  const header = headers();
  const path = header.get("next-url");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {user.name}</p>
      </div>
      <ul className={styles.sidebar_main}>
        {path && path === "/p-user" ? (
          <>
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discount"}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <Logout />
    </aside>
  );
}
