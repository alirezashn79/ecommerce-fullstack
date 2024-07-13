import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar";
import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";

export default async function IndexLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  let user = null;

  const cookiesStore = cookies();

  const token = cookiesStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const tokenPayload = verifyAccessToken(tokenValue);

    if (tokenPayload && typeof tokenPayload === "object") {
      await connectToDB();

      user = await userModel.exists({ email: tokenPayload.email });
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
