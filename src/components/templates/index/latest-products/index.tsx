import ProductCard from "@/components/modules/product-card";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import styles from "./latest-products.module.css";

interface ILatestProductProps {
  products: {
    _id: string;
    name: string;
    score: number;
    price: number;
    img: string;
  }[];
}
export default function LatestProducts({ products }: ILatestProductProps) {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {products.map((item) => (
          <ProductCard key={item._id} {...item} />
        ))}
      </main>
    </div>
  );
}
