import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { signinWithEmailSchema } from "schemas/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    try {
      await signinWithEmailSchema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      return Response.json(
        { message: "invalid data...!", errorFields: err.inner },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    const user = await userModel.findOne({ email }, "password");

    if (!user) {
      return Response.json(
        { message: "user not found...!" },
        {
          status: 404,
        }
      );
    }

    const isVerifyPassword = await verifyPassword(password, user.password);

    if (!isVerifyPassword) {
      return Response.json(
        { message: "user or password is wrong...!" },
        {
          status: 401,
        }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await userModel.findByIdAndUpdate(user._id, {
      $set: { refreshToken },
    });

    return Response.json(
      { message: "user signed in successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;max-age=3600`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: "unknown internal server error...!", error: error },
      {
        status: 500,
      }
    );
  }
}
