import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner";
import LatestProducts from "@/components/templates/index/latest-products";
import Promote from "@/components/templates/index/promote/Promote";
import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";
export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload && typeof tokenPayload === "object") {
      await connectToDB();
      user = await userModel.findOne(
        { email: tokenPayload.email },
        "name email phone role"
      );

      console.log(user);
    }
  }

  return (
    <>
      <Navbar isLogin={JSON.parse(JSON.stringify(user))} />
      <Banner />
      <LatestProducts />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
