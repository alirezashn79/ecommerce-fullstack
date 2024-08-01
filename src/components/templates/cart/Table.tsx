"use client";

import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import styles from "./table.module.css";
import Total from "./Total";
import useCartStore from "@/store/cart/cartStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "configs/client";
import swal from "sweetalert";

const Table = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);

  const calcTotalPrice = () => {
    let total = 0;
    if (products.length > 0) {
      total = products.reduce((prev, current) => {
        return prev + current.count * current.price;
      }, 0);
    }

    setTotalPrice(total);
  };

  const handleRemoveFromCart = (id: string) => {
    swal({
      title: "محصول از سبد خرید حذف شود?",
      buttons: ["خیر", "بله"],
      icon: "warning",
    }).then((result) => {
      if (!result) return;
      removeFromCart(id);
    });
  };

  useEffect(() => {
    calcTotalPrice();
  }, [products]);

  const handleCheckDiscountCode = async () => {
    if (!discountCode.trim()) return toast.error("کد تخفیف را وارد کنید");
    try {
      setDiscountLoading(true);
      const res = await client.put("/discount", { code: discountCode });
      setIsOff(true);
      const newTotalPrice =
        totalPrice - (totalPrice * res.data.data.percent) / 100;
      setTotalPrice(newTotalPrice);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      setIsOff(false);
    } finally {
      setDiscountLoading(false);
    }
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
                    <span
                      onClick={() =>
                        item.count > 1
                          ? addToCart({ ...item, count: item.count - 1 })
                          : removeFromCart(item.id)
                      }
                    >
                      -
                    </span>
                    <p>{item.count}</p>
                    <span
                      onClick={() =>
                        addToCart({ ...item, count: item.count + 1 })
                      }
                    >
                      +
                    </span>
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
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose
                    onClick={() => handleRemoveFromCart(item.id)}
                    className={styles.delete_icon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}>بروزرسانی سبد خرید</button>
          {!isOff ? (
            <div>
              <button
                onClick={handleCheckDiscountCode}
                disabled={discountLoading}
                className={styles.set_off_btn}
              >
                اعمال کوپن
              </button>
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                type="text"
                placeholder="کد تخفیف"
              />
            </div>
          ) : (
            <div className={styles.off}>
              <p>کوپن اعمال شد</p>
            </div>
          )}
        </section>
      </div>
      <Total totalPrice={totalPrice} />
    </>
  );
};

export default Table;
