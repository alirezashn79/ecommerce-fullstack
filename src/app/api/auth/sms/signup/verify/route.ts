import connectToDB from "configs/db";
import otpModel from "models/Otp";
import userModel from "models/User";
import { cookies } from "next/headers";
import { zVerifySchema } from "schemas/otp";
import { generateAccessToken, generateRefreshToken } from "utils/auth";

export async function POST(req: Request) {
  try {
    const reqBody = (await req.json()) as {
      code: string;
      phone: string;
    };

    const validationResult = zVerifySchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid data",
          error: validationResult.error.formErrors.fieldErrors,
        },
        {
          status: 400,
        }
      );
    }
    await connectToDB();

    const isUser = await userModel.exists({
      phone: validationResult.data.phone,
    });

    if (!!isUser) {
      return Response.json({ message: "user already exist" }, { status: 400 });
    }

    const result = await otpModel.findOne(validationResult.data);

    if (!result || result.isExpired)
      return Response.json({ message: "No records found" }, { status: 404 });

    const now = new Date().getTime();

    if (now > result.expTime) {
      return Response.json({ message: "code expired" }, { status: 410 });
    }

    await otpModel.findByIdAndUpdate(result._id, {
      isExpired: true,
    });

    const accessToken = generateAccessToken({
      phone: validationResult.data.phone,
    });
    const refreshToken = generateRefreshToken({
      phone: validationResult.data.phone,
    });

    const cookieStore = cookies();

    cookieStore.set("token", accessToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    cookieStore.set("refresh-token", refreshToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await userModel.create({
      phone: validationResult.data.phone,
      email: `${validationResult.data.phone}@gmail.com`,
      refreshToken,
    });

    return Response.json(
      { message: "user signed up...!" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
