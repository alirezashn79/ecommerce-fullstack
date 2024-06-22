import MoreProducts from "@/components/templates/product/MoreProducts";
import Tabs from "@/components/templates/product/Tabs";
import Details from "components/templates/product/Detals";
import Gallery from "components/templates/product/Gallery";
import productModel from "models/Product";
import styles from "styles/product.module.css";

const product = async ({ params }: {params: {id: string}}) => {
  const product = await productModel.findById(params.id);
  
  return (
    <div>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details />
          <Gallery />
        </div>
        <Tabs />
        <MoreProducts />
      </div>
    </div>
  );
};

export default product;
