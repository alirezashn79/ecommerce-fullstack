import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar";
import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;

  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const tokenPayload = verifyAccessToken(tokenValue);

    console.log(tokenPayload);

    if (tokenPayload && typeof tokenPayload === "object") {
      await connectToDB();

      user = await userModel.findOne(
        { email: tokenPayload.email },
        "name email phone role"
      );
    }
  }
  return (
    <div style={{ overflow: "auto" }}>
      <Navbar isLogin={user ? true : false} />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
