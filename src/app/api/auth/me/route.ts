import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  let user = null;

  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload && typeof tokenPayload === "object") {
      await connectToDB();
      user = await userModel.findOne(
        { email: tokenPayload.email },
        "name email phone role"
      );
    }
  }

  return Response.json(user);
}
