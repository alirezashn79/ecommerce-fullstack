"use client";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";
import styles from "./product.module.css";
import client from "configs/client";
import { useRouter } from "next/navigation";

const ProductCard = ({ data }: { data: unknown }) => {
  const router = useRouter();
  let typedData = null;
  if (!!data && typeof data === "object") {
    typedData = data as {
      _id: string;
      name: string;
      price: number;
      score: number;
    };
  }

  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await client.delete(`/wishlist/${typedData?._id}`);

        if (res.status && res.status === 200) {
          swal({
            title: "محصول از علاقه مندی ها حذف شد",
            icon: "success",
          }).then(() => router.refresh());
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/product/123"}>
        <img
          width={283}
          height={283}
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt=""
        />
      </Link>
      <p dir="rtl">{typedData?.name}</p>
      <div>
        <div>
          {Array.from({ length: typedData?.score || 0 })
            .fill(0)
            .map((_, idx) => (
              <IoMdStar key={idx} />
            ))}
        </div>
        <span>{typedData?.price.toLocaleString()} تومان</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول
      </button>
    </div>
  );
};

export default ProductCard;
