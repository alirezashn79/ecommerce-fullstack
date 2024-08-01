"use client";
import useCartStore from "@/store/cart/cartStore";
import styles from "./addToCart.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const products = useCartStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, price, count });
    toast.success("به سبد خرید اضافه شد");
  };

  useEffect(() => {
    const result = products.find((item) => item.id === id);
    if (result) {
      setCount(result.count);
    }
  }, [products]);

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
