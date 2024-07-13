import Link from "next/link";
import styles from "./product-card.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import { IFProduct } from "types/auth";

export default function ProductCard({ product }: { product: IFProduct }) {
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          alt=""
        />
        <div className={styles.icons}>
          <Link href={`/product/${product._id}`}>
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${product._id}`}>{product.name}</Link>
        <div>
          {Array.from({ length: product.score }).map((_, idx) => (
            <FaStar key={idx} />
          ))}
          {Array.from({ length: 5 - product.score }).map((_, idx) => (
            <FaRegStar key={idx} />
          ))}
        </div>
        <span>{product.price.toLocaleString()} تومان</span>
      </div>
    </div>
  );
}
