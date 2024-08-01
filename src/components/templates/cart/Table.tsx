"use client";

import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import styles from "./table.module.css";
import Total from "./Total";
import useCartStore from "@/store/cart/cartStore";

const Table = () => {
  const products = useCartStore((state) => state.products);

  const calcTotalPrice = () => {
    let total = 0;
    if (products.length > 0) {
      total = products.reduce((prev, current) => {
        return prev + current.count * current.price;
      }, 0);
    }

    return total;
  };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr>
                <td key={item.id}>
                  {(item.price * item.count).toLocaleString()} تومان
                </td>
                <td className={styles.counter}>
                  <div>
                    {/* <span>-</span> */}
                    <p>{item.count}</p>
                    {/* <span>+</span> */}
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn}>اعمال کوپن</button>
            <input type="text" placeholder="کد تخفیف" />
          </div>
        </section>
      </div>
      <Total totalPrice={calcTotalPrice} />
    </>
  );
};

export default Table;
