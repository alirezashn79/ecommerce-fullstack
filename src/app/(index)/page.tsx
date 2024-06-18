import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner";
import LatestProducts from "@/components/templates/index/latest-products";
import Promote from "@/components/templates/index/promote/Promote";

export default async function Home() {
  return (
    <>
      <Banner />
      <LatestProducts />
      <Promote />
      <Articles />
    </>
  );
}
