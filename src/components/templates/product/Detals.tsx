import { CiHeart } from "react-icons/ci";
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
import Breadcrumb from "./Breadcrumb";
import styles from "./details.module.css";

const Details = () => {
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb
        title={
          "کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی"
        }
      />
      <h2>
        کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی
      </h2>

      <div className={styles.rating}>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p>(دیدگاه 7 کاربر)</p>
      </div>

      <p className={styles.price}>205,000 تومان</p>
      <span className={styles.description}>
        کپسول قهوه ست مدل Gold سازگار با دستگاههای کپسولی نسپرسو می باشد . ترکیب
        این قهوه عربیکا بوده و با برشته کاری متوسط درجاتی از اسیدیته به همراه تن
        واری متوسط , و برای ترکیب با شیر بسیار عالی می باشد.
      </span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <div>
          <CiHeart />
          <a href="/">افزودن به علاقه مندی ها</a>
        </div>
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: GOLD Nespresso Compatible capsule</strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong> کپسول قهوه،کپسول قهوه ست پرسو،کپسول قهوه
          ایرانی،کپسول قهوه نسپرسو ایرانی،قهوه ست ، Setpresso،Gold Setpresso
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
