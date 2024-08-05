import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { zSigninSchema } from "schemas/auth/signin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = zSigninSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "invalid data...!",
          errorFields: validationResult.error.formErrors.fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDB();

    const user = await userModel.findOne(
      {
        $or: [
          { email: validationResult.data.identifier },
          { phone: validationResult.data.identifier },
        ],
      },
      "password phone"
    );

    if (!user) {
      return Response.json(
        { message: "user not found...!" },
        {
          status: 404,
        }
      );
    }

    if (user.password) {
      const isVerifyPassword = await verifyPassword(
        validationResult.data.password as string,
        user.password
      );

      if (!isVerifyPassword) {
        return Response.json(
          { message: "user or password is wrong...!" },
          {
            status: 401,
          }
        );
      }
    } else {
      return Response.json(
        { message: "please signin with code" },
        {
          status: 400,
        }
      );
    }

    const accessToken = generateAccessToken({ phone: user.phone });
    const refreshToken = generateRefreshToken({ phone: user.phone });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    return Response.json(
      { message: "user signed in successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
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
