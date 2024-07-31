import { cookies } from "next/headers";
import { verifyAccessToken } from "./auth";
import connectToDB from "configs/db";
import userModel from "models/User";

const authUser = async () => {
  const cookiesStore = cookies();

  const tokenCookie = cookiesStore.get("token");

  if (!tokenCookie) {
    return false;
  }

  const token = tokenCookie.value;

  const tokenPayload = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }

  if (typeof tokenPayload === "object") {
    await connectToDB();
    const user = await userModel
      .findOne({ email: tokenPayload.email }, "name role")
      .lean();

    if (!user) {
      return false;
    }
    return user;
  }
};

const getUserId = async () => {
  const token = cookies().get("token")?.value;
  const tokenPayload = verifyAccessToken(String(token));
  const email = Object(tokenPayload).email;
  await connectToDB();
  const user = await userModel.exists({ email });
  return String(user?._id);
};

export { authUser, getUserId };
