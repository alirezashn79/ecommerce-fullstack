"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useWindowScroll } from "@uidotdev/usehooks";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";

function Navbar() {
  const [{ y }] = useWindowScroll();
  return (
    <nav className={!y || y < 120 ? styles.navbar : styles.navbar_fixed}>
      <main>
        <div>
          <Link href="/">
            <Image height={53} width={171} src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {/* <li>
            <Link href="/login-register">ورود / عضویت</Link>
          </li> */}

          {/* Start My-account section */}
          <div className={styles.dropdown}>
            <Link href="/p-user">
              <IoIosArrowDown className={styles.dropdown_icons} />
              حساب کاربری
            </Link>
            <div className={styles.dropdown_content}>
              <Link href="/p-user/orders">سفارشات</Link>
              <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
              <Link href="/p-user/comments">کامنت‌ها</Link>
              <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
              <Link href="/p-user/account-details">جزئیات اکانت</Link>
            </div>
          </div>

          {/* Finish My-account section */}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <LuShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>1</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
