"use client";
import Link from "next/link";
import styles from "./table.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import client from "configs/client";
import { toast } from "react-toastify";

interface IDiscountProps {
  title: string;
  products: {
    _id: string;
    name: string;
    price: number;
    score: number;
  }[];
}
export default function Table({ title, products }: IDiscountProps) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async ({ id }: { id: string }) => {
    swal({
      title: "کد تخفیف حذف شود؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (!result) return;
      try {
        setLoading(true);
        const res = await client.delete(`/products/${id}`);
        refresh();
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>نام محصول</th>
          <th>قیمت</th>
          <th>امتیاز</th>
          <th>ویرایش</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item._id}>
            <td>{item._id.slice(16)}</td>
            <td>{item.name}</td>
            <td>{item.price.toLocaleString()}</td>
            <td>{item.score}</td>

            <td>
              <Link
                href={`/p-admin/products/edit/${item._id}`}
                // disabled={loading}
                // onClick={() => handleDeleteProduct({ id: item._id })}
                type="button"
                className={styles.edit_btn}
              >
                ویرایش
              </Link>
            </td>
            <td>
              <button
                disabled={loading}
                onClick={() => handleDeleteProduct({ id: item._id })}
                type="button"
                className={styles.delete_btn}
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
