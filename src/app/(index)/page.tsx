import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner";
import LatestProducts from "@/components/templates/index/latest-products";
import Promote from "@/components/templates/index/promote/Promote";
import connectToDB from "configs/db";
import productModel from "models/Product";

export default async function Home() {
  await connectToDB();
  const products = await productModel
    .find({}, "name price score img")
    .sort({ _id: -1 });
  console.log(products);
  return (
    <>
      <Banner />
      <LatestProducts products={JSON.parse(JSON.stringify(products))} />
      <Promote />
      <Articles />
    </>
  );
}
