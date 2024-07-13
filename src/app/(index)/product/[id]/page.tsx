import MoreProducts from "@/components/templates/product/MoreProducts";
import Tabs from "@/components/templates/product/Tabs";
import Details from "components/templates/product/Detals";
import Gallery from "components/templates/product/Gallery";
import connectToDB from "configs/db";
import productModel from "models/Product";
import { notFound } from "next/navigation";
import styles from "styles/product.module.css";
import { IFProduct } from "types/auth";

const Product = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  await connectToDB();

  const product: IFProduct = await productModel
    .findById(id, "-__v")
    .populate("comments", "-__v")
    .orFail()
    .catch(() => notFound());

  const commentCount = product.comments.filter(
    (item) => item.isAccepted
  ).length;

  const relatedProducts = await productModel
    .find({
      smell: product.smell,
      $nor: [{ _id: product._id }],
    })
    .exec();

  return (
    <div>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            id={String(product._id)}
            name={product.name}
            price={product.price}
            score={product.score || 5}
            inventory={product.inventory}
            shortDescription={product.shortDescription}
            tags={product.tags}
            commentCount={commentCount}
          />
          <Gallery />
        </div>
        <Tabs
          productID={String(product._id)}
          productName={product.name}
          longDescription={product.longDescription}
          comments={JSON.parse(JSON.stringify(product.comments))}
          smell={product.smell}
          weight={product.weight}
          suitableFor={product.suitableFor}
        />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
    </div>
  );
};

export default Product;
