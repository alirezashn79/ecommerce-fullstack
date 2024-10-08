import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";
import { generateAccessToken, verifyRefreshToken } from "utils/auth";

export async function GET() {
  try {
    const refreshToken = cookies().get("refresh-token")?.value;

    if (!refreshToken) {
      return Response.json(
        { message: "Unauthorized no cookie" },
        {
          status: 401,
        }
      );
    }

    await connectToDB();

    const result = await userModel.findOne(
      { refreshToken },
      "refreshToken phone"
    );

    if (!result) {
      return Response.json(
        { message: "Unauthorized no db result" },
        {
          status: 401,
        }
      );
    }

    const tokenPayload = verifyRefreshToken(result.refreshToken);

    if (!tokenPayload || typeof tokenPayload !== "object") {
      return Response.json(
        { message: "Unauthorized no verify" },
        {
          status: 401,
        }
      );
    }

    const newAccessToken = generateAccessToken({ phone: result.phone });

    const cookieStore = cookies();

    cookieStore.set("token", newAccessToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return Response.json(
      { message: "access token generated successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error...!", error: error.message },
      {
        status: 500,
      }
    );
  }
}
