import Stepper from "components/modules/stepper/Stapper";
import Table from "components/templates/cart/Table";
import styles from "styles/cart.module.css";

const page = () => {
  return (
    <>
      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table />
      </main>

      {/* <div className={styles.cart_empty} data-aos="fade-up">
        <TbShoppingCartX />
        <p>سبد خرید شما در حال حاضر خالی است. </p>
        <span>
          قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
        </span>
        <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
      </div> */}
    </>
  );
};

export default page;
