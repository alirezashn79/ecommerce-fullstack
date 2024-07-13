import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import ProductCard from "@/components/modules/product-card";
import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import wishListModel from "models/Wishlist";

import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import styles from "styles/wishlist.module.css";

const page = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (!token) {
    redirect("/");
  }

  const tokenValue = token.value;

  const tokenPayload = verifyAccessToken(tokenValue);

  if (!tokenPayload) {
    redirect("/");
  }

  await connectToDB();

  const user = await userModel.exists({
    email: typeof tokenPayload === "object" ? tokenPayload.email : "",
  });

  if (!user) {
    redirect("/");
  }

  const wishes = await wishListModel
    .find({ user: user._id }, "-__v")
    .populate("product", "name price score")
    .lean();

  return (
    <>
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes?.map((item) => (
              <ProductCard
                key={item.product._id}
                id={item.product._id}
                name={item.product.name}
                price={item.product.price}
                score={item.product.score}
              />
            ))}
        </section>

        {!wishes.length && (
          <div className={styles.wishlist_empty} data-aos="fade-up">
            <FaRegHeart />
            <p>محصولی یافت نشد</p>
            <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
            <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
            <div>
              <Link href="/">بازگشت به فروشگاه</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default page;
