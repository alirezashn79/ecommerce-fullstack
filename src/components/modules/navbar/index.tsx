"use client";

import { useWindowScroll } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import styles from "./Navbar.module.css";
import useCartStore from "@/store/cart/cartStore";

interface INavbarProps {
  isLogin: boolean;
}

function Navbar({ isLogin }: INavbarProps) {
  const [{ y }] = useWindowScroll();
  const products = useCartStore((state) => state.products);
  return (
    <nav className={!y || y < 85 ? styles.navbar : styles.navbar_fixed}>
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

          {isLogin ? (
            <div className={styles.dropdown}>
              <Link href="/p-user">
                <IoIosArrowDown className={styles.dropdown_icons} />
                حساب کاربری
              </Link>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                <Link href="/p-user/comments">کامنت‌ها</Link>
                <Link href="/wishlist">علاقه‌مندی‌ها</Link>
                <Link href="/p-user/account-details">جزئیات اکانت</Link>
              </div>
            </div>
          ) : (
            <li>
              <Link href="/login-register">ورود / عضویت</Link>
            </li>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <LuShoppingCart />
            {products.length > 0 && <span>{products.length}</span>}
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
