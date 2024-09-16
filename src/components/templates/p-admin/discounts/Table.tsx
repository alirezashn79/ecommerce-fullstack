"use client";
import client from "configs/client";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import swal from "sweetalert";

interface IDiscountProps {
  title: string;
  discounts: {
    _id: string;
    code: string;
    percent: number;
    maxUse: number;
    uses: number;
    createdAt: Date;
  }[];
}
export default function Table({ title, discounts }: IDiscountProps) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteDiscount = async ({ id }: { id: string }) => {
    swal({
      title: "کد تخفیف حذف شود؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (!result) return;
      try {
        setLoading(true);
        const res = await client.delete(`/discount/${id}`);
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
          <th>کد تخفیف</th>
          <th>اعتبار</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>تاریخ ایجاد</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((item) => (
          <tr key={item._id}>
            <td>{item._id.slice(16)}</td>
            <td>
              <code>{item.code}</code>
            </td>
            <td style={{ color: item.maxUse > item.uses ? "green" : "red" }}>
              {item.maxUse > item.uses ? "✔" : "❌"}
            </td>
            <td>{item.percent}</td>
            <td>{item.maxUse}</td>
            <td>{item.uses}</td>
            <td>{new Date(item.createdAt).toLocaleString("fa-IR")}</td>
            <td>
              <button
                disabled={loading}
                onClick={() => handleDeleteDiscount({ id: item._id })}
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
