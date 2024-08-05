import Link from "next/link";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./product-card.module.css";

interface IProductCardProps {
  _id: string;
  name: string;
  score: number;
  price: number;
  img: string;
}

export default function ProductCard({
  _id,
  name,
  score,
  price,
  img,
}: IProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src={
            img ||
            "https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          }
          alt=""
        />
        <div className={styles.icons}>
          <Link href={`/product/${_id}`}>
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
        <Link href={`/product/${_id}`}>{name}</Link>
        <div>
          {Array.from({ length: score }).map((_, idx) => (
            <FaStar key={idx} />
          ))}
          {Array.from({ length: 5 - score }).map((_, idx) => (
            <FaRegStar key={idx} />
          ))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
}
