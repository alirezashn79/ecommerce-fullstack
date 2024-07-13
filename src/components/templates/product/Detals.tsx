import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaStar,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import AddToWishlist from "./AddToWishlist";
import Breadcrumb from "./Breadcrumb";
import styles from "./details.module.css";

interface IDetailsProps {
  id: string;
  name: string;
  score: number;
  commentCount: number;
  price: number;
  shortDescription: string;
  inventory: number;
  tags: string[];
}

const Details: React.FC<IDetailsProps> = ({
  id,
  name,
  score,
  commentCount,
  price,
  shortDescription,
  inventory,
  tags,
}) => {
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={name} />
      <h2>{name}</h2>

      <div className={styles.rating}>
        <div>
          {Array.from({ length: score }).map((_, idx) => (
            <FaStar key={idx} />
          ))}
          {score < 5 &&
            Array.from({ length: 5 - score }).map((_, idx) => (
              <FaStar key={idx} style={{ color: "gray" }} />
            ))}
        </div>

        <p>(دیدگاه {commentCount} کاربر)</p>
      </div>

      <p className={styles.price}>{price.toLocaleString()} تومان</p>
      <span className={styles.description}>{shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        {inventory > 0 ? (
          <>
            <IoCheckmark />
            <p>موجود در انبار</p>
          </>
        ) : (
          <p>اتمام موجودی</p>
        )}
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishlist productId={id} />
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {id}</strong>

        <p>
          <strong>برچسب:</strong> {tags.join(", ")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
