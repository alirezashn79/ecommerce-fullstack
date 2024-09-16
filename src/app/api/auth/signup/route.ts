import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { cookies } from "next/headers";
import { zSignUpUserSchema } from "schemas/auth/signup";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // validation
    const validationResult = zSignUpUserSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "validation error",
          error: validationResult.error.formErrors.fieldErrors,
        },
        {
          status: 422,
        }
      );
    }

    // connect to db
    await connectToDB();

    // user exist
    const isUserExist = await userModel.exists({
      phone: body.phone,
    });

    if (isUserExist) {
      return Response.json(
        { message: "user already exist" },
        {
          status: 422,
        }
      );
    }

    // hash password
    const hashedPassword = await hashPassword(
      validationResult.data.password as string
    );

    // generate access token
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

    // user type
    const usersLength = await userModel.countDocuments();

    // create user
    await userModel.create({
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      password: hashedPassword,
      role: usersLength > 0 ? "USER" : "ADMIN",
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
      { message: "Server Error...!", error },
      {
        status: 500,
      }
    );
  }
}
