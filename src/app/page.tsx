import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner";
import LatestProducts from "@/components/templates/index/latest-products";
import Promote from "@/components/templates/index/promote/Promote";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <LatestProducts />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
