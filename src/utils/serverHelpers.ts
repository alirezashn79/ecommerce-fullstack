import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";

const authUser = async () => {
  const cookiesStore = cookies();

  const tokenCookie = cookiesStore.get("token");

  if (!tokenCookie) {
    return false;
  }

  const token = tokenCookie.value;

  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return false;
  }

  if (typeof tokenPayload === "object") {
    await connectToDB();
    const user = await userModel.findOne(
      { phone: tokenPayload.phone },
      "name role"
    );

    if (!user) {
      return false;
    }
    return user;
  }
};

const getUserId = async () => {
  const token = cookies().get("token")?.value;
  const tokenPayload = verifyToken(String(token));
  const phone = Object(tokenPayload).phone;
  await connectToDB();
  const user = await userModel.exists({ phone });
  return String(user?._id);
};

export { authUser, getUserId };
