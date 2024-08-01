"use client";
import useCartStore from "@/store/cart/cartStore";
import styles from "./addToCart.module.css";
import { useState } from "react";

export default function AddToCart({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) {
  const [count, setCount] = useState(1);
  const add = useCartStore((state) => state.addToCart);
  const products = useCartStore((state) => state.products);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    add({ id, name, price, count });
    setCount(1);
  };

  return (
    <div className={styles.cart}>
      <div>
        <span onClick={handleDecrement}>-</span>
        {count}
        <span onClick={handleIncrement}>+</span>
      </div>

      <button onClick={handleAddToCart}>افزودن به سبد خرید</button>
    </div>
  );
}
